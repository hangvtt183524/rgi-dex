import { useMemo } from 'react';
import {
    toUniswapV2LiquidityToken,
    toV2LiquidityToken,
    useSelectedChainNetwork,
    useTrackedTokenPairs
} from 'state/user/hooks';
import { UNSUPPORTED_V2POOL_CHAIN_IDS } from 'config/constants/chains';
import { useTokenBalancesWithLoadingIndicator } from 'hooks/useBalances';
import { PairState, useV2Pairs } from './useV2Pairs';

export const useV2PairsByAccount = (address: string | undefined) => {
    const chainId = useSelectedChainNetwork();
    const unsupportedV2Network = chainId && UNSUPPORTED_V2POOL_CHAIN_IDS.includes(chainId);
    let trackedTokenPairs = useTrackedTokenPairs();
    if(unsupportedV2Network) trackedTokenPairs = [];

    const tokenPairsWithLiquidityTokens = useMemo (() => trackedTokenPairs.map((tokens) => (
        {
            liquidityToken: toV2LiquidityToken(tokens),
            tokens,
        }
    )), [trackedTokenPairs])
    const tokenPairsUniswapWithLiquidityTokens = useMemo (() => trackedTokenPairs.map((tokens) => (
        {
            liquidityToken: toUniswapV2LiquidityToken(tokens),
            tokens,
        }
    )), [trackedTokenPairs]);

    const liquidityTokens = useMemo (() => (
        tokenPairsWithLiquidityTokens.map((item) => (item.liquidityToken))
    ), [tokenPairsWithLiquidityTokens]);
    const uniswapLiquidityTokens = useMemo (() => (
        tokenPairsUniswapWithLiquidityTokens.map((item) => (item.liquidityToken))
    ), [tokenPairsUniswapWithLiquidityTokens]);

    const [ liquidityTokenBalances, loadingLiquidityBalances] =
        useTokenBalancesWithLoadingIndicator( address || undefined, liquidityTokens);
    const [ uniswapLiquidityTokenBalances, loadingUniswapLiquidityTokenBalances] =
        useTokenBalancesWithLoadingIndicator(address || undefined, uniswapLiquidityTokens);

    const liquidityTokenWithBalances = useMemo (() =>
        tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
            (liquidityTokenBalances[liquidityToken.address]?.greaterThan('0'))
    ), [tokenPairsWithLiquidityTokens, liquidityTokenBalances]);
    const uniswapLiquidityTokenWithBalances = useMemo (() =>
        tokenPairsUniswapWithLiquidityTokens.filter(({ liquidityToken }) =>
            (uniswapLiquidityTokenBalances[liquidityToken.address]?.greaterThan('0'))
        ), [tokenPairsUniswapWithLiquidityTokens, uniswapLiquidityTokenBalances]);

    const uniswapPairsWithBalances = useV2Pairs(uniswapLiquidityTokenWithBalances.map(({ tokens }) => tokens), {isUniswap: true});
    const pairsWithBalances = useV2Pairs(liquidityTokenWithBalances.map(({tokens}) => tokens));

    return useMemo(() => {
        const isLoading = loadingUniswapLiquidityTokenBalances ||
            uniswapPairsWithBalances.length < uniswapLiquidityTokenWithBalances.length ||
            pairsWithBalances.length < liquidityTokenWithBalances.length ||
            (uniswapPairsWithBalances.length && uniswapPairsWithBalances.every(([pairState]) => pairState === PairState.LOADING)) ||
            (pairsWithBalances.length && pairsWithBalances.every(([pairState]) => pairState === PairState.LOADING));
        return {
            data: uniswapPairsWithBalances.concat(pairsWithBalances),
            loadingData: isLoading,
        }
    }, [loadingUniswapLiquidityTokenBalances, uniswapLiquidityTokenWithBalances.length, uniswapPairsWithBalances])
}