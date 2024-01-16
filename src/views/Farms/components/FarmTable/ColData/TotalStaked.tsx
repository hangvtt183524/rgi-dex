import { RowCenter } from 'components/Layout/Row';
import Text from 'components/Text';
import React, {useMemo} from 'react';
import BigNumber from 'bignumber.js';
import {CurrencyAmount, Token} from 'config/sdk-core';
import {useTotalSupply} from 'hooks/useTotalSupply';
import {toUniswapV2LiquidityToken, toV2LiquidityToken} from 'state/user/hooks';
import {useTokenBalancesWithLoadingIndicator} from 'hooks/useBalances';
import {useV2Pairs} from 'hooks/pool/useV2Pairs';
import {Pair} from 'config/v2-sdk';
import {hasTokenRobo} from 'config/tokens';
import {BIG_TEN} from 'config/constants/number';
import { TotalStakedProps } from '../../types';

const TotalStaked: React.FunctionComponent<React.PropsWithChildren<TotalStakedProps>> = ({ farmData }) => {
    const tokenPairs: [Token, Token][] = [[farmData?.token, farmData?.quoteToken]];

    const tokenPairsWithLiquidityTokens = useMemo(
        () =>
            tokenPairs.map((tokens) => ({
                liquidityToken: toV2LiquidityToken(tokens),
                tokens,
            })).concat(
                tokenPairs.map((tokens) => ({
                    liquidityToken: toUniswapV2LiquidityToken(tokens),
                    tokens,
                }))
            ),
        [tokenPairs],
    );

    const liquidityTokens = useMemo(
        () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
        [tokenPairsWithLiquidityTokens],
    );

    const [
        v2PairsBalances,
    ] = useTokenBalancesWithLoadingIndicator(farmData?.manager ?? undefined, liquidityTokens);

    const liquidityTokensWithBalances = useMemo(
        () =>
            tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
                v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
            ),
        [tokenPairsWithLiquidityTokens, v2PairsBalances],
    );

    const v2Pairs = useV2Pairs(liquidityTokensWithBalances.map(({ tokens }) => tokens), { isUniswap: hasTokenRobo(farmData?.token, farmData?.quoteToken) });

    const pairWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))[0];
    const totalLiquidityToken = useTotalSupply(pairWithLiquidity?.liquidityToken);

    const stakeTVL = useMemo(() => {
        if (totalLiquidityToken) {
            const amountToRBIF = pairWithLiquidity?.getLiquidityValue(farmData?.token, totalLiquidityToken, CurrencyAmount.fromRawAmount(pairWithLiquidity?.liquidityToken, farmData?.lpStakedTotal), false);
            return new BigNumber(amountToRBIF?.quotient.toString())
                .dividedBy(BIG_TEN.pow(farmData?.tokenDecimals || 18))
                .multipliedBy(new BigNumber(farmData?.price))
                .dividedBy(1000)
                .toNumber()
                .toFixed(4) || undefined;
        }

        return 0;
    }, [pairWithLiquidity, pairWithLiquidity, farmData])

    return (
        <RowCenter>
            <Text fontSize={['12px', '', '', '', '', '14px']}>
                {stakeTVL ? `$${stakeTVL}K` : '-'}
            </Text>
        </RowCenter>
    );
};

export default TotalStaked;