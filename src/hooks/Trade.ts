import { useMemo } from 'react';

import { Currency, CurrencyAmount, SupportedChainId, Token, TradeType } from 'config/sdk-core';
import { Pair, Trade } from 'config/v2-sdk';
import { ADDITIONAL_BASES, BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES } from 'config/tokens';
import { flatMap } from 'lodash';
import { useSelectedChainNetwork } from 'state/user/hooks';
import { PairState, useV2Pairs, useV2Pairs2 } from './pool/useV2Pairs';
import { useMultipleContractSingleData } from '../state/multicall/hooks';
import { getRouterV2Address, getRouterV2UniswapAddress } from '../utils/addressHelpers';
import { IROUTER_V2_02 } from '../config/abis';

export function useAllCommonPairs(
  currencyA?: Token,
  currencyB?: Token,
  options?: {
    isUniswap?: boolean;
  },
): Pair[] {
    const chainId = useSelectedChainNetwork();

  const [tokenA, tokenB] = chainId ? [currencyA, currencyB] : [undefined, undefined];

  const bases: Token[] = useMemo(() => {
    if (!chainId) return [];

    const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
    const additionalA = tokenA ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : [];
    const additionalB = tokenB ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : [];

    return [...common, ...additionalA, ...additionalB];
  }, [chainId, tokenA, tokenB]);

  const basePairs: [Token, Token][] = useMemo(
    () => flatMap(bases, (base): [Token, Token][] => bases.map((otherBase) => [base, otherBase])),
    [bases],
  );

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            .filter(([tokenA_, tokenB_]) => {
              if (!chainId) return true;
              const customBases = CUSTOM_BASES[chainId];

              const customBasesA: Token[] | undefined = customBases?.[tokenA_.address];
              const customBasesB: Token[] | undefined = customBases?.[tokenB_.address];

              if (!customBasesA && !customBasesB) return true;

              if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base))) return false;
              if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base))) return false;

              return true;
            })
        : [],
    [tokenA, tokenB, bases, basePairs, chainId],
  );

  const allPairsWithUniswap = useV2Pairs(allPairCombinations, options);
  const allPairsNoUniswap = useV2Pairs2(allPairCombinations, options, chainId);

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        (options?.isUniswap ? allPairsWithUniswap : allPairsNoUniswap)
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr;
            return memo;
          }, {}),
      ),
    [allPairsWithUniswap, allPairsNoUniswap, options],
  );
}

export function useTradeExactIn(
  currencyAmountIn?: CurrencyAmount<Currency>,
  currencyOut?: Currency,
  options?: {
    isUniswap?: boolean;
  },
): Trade<Currency, Currency, TradeType> | null {
  const v2Pairs = useAllCommonPairs(currencyAmountIn?.currency as Token, currencyOut as Token, options);
  const amountOutResult = useMultipleContractSingleData(
    [options?.isUniswap ? getRouterV2UniswapAddress(currencyOut?.chainId || SupportedChainId.SEPOLIA) : getRouterV2Address(currencyOut?.chainId || SupportedChainId.SEPOLIA)],
    IROUTER_V2_02,
    'getAmountsOut',
    [currencyAmountIn?.quotient.toString(), [currencyAmountIn?.currency?.wrapped.address, currencyOut?.wrapped.address]]
  );

  return useMemo(() => {
    if (!currencyAmountIn) {
      return null;
    }

    const amountOut = amountOutResult?.[0]?.result?.[0]?.[1] ? CurrencyAmount.fromRawAmount(currencyOut, amountOutResult[0].result[0][1]) : undefined;

    if (currencyAmountIn && currencyOut && v2Pairs.length > 0 && amountOut) {
      return Trade.bestTradeExactIn(
          v2Pairs,
          currencyAmountIn as any,
          currencyOut,
          {
            maxHops: 3,
            maxNumResults: 1,
          },
          amountOut)[0] ?? null
    }
    return null;
  }, [v2Pairs, currencyAmountIn, currencyOut, amountOutResult]);
}

export function useTradeExactOut(
  currencyIn?: Currency,
  currencyAmountOut?: CurrencyAmount<Currency>,
  options?: {
    isUniswap?: boolean;
  },
): Trade<Currency, Currency, TradeType> | null {
  const v2Pairs = useAllCommonPairs(currencyIn as Token, currencyAmountOut?.currency as Token, options);

  const amountInResult = useMultipleContractSingleData(
    [options?.isUniswap ? getRouterV2UniswapAddress(currencyIn?.chainId || SupportedChainId.SEPOLIA) : getRouterV2Address(currencyIn?.chainId || SupportedChainId.SEPOLIA)],
    IROUTER_V2_02,
    'getAmountsIn',
    [currencyAmountOut?.quotient.toString(), [currencyIn?.wrapped.address, currencyAmountOut?.currency?.wrapped.address]]
  );

  return useMemo(() => {
    if (!currencyAmountOut) return null;

    const amountIn = amountInResult?.[0]?.result?.[0]?.[1] ? CurrencyAmount.fromRawAmount(currencyIn, amountInResult[0].result[0][0]) : undefined;

    if (currencyIn && currencyAmountOut && v2Pairs.length > 0 && amountIn) {
      return Trade.bestTradeExactOut(
        v2Pairs,
          currencyIn,
          currencyAmountOut as any,
          {
            maxHops: 3,
            maxNumResults: 1,
          },
          amountIn
      )[0] ?? null
    }
    return null;
  }, [v2Pairs, currencyIn, currencyAmountOut, amountInResult]);
}
