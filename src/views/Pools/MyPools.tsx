import { Flex, Grid } from 'components/Box';
import {Column, ColumnCenter} from 'components/Layout/Column';
import PositionCard from 'components/PositionCard';
import Text from 'components/Text';
import { Pair } from 'config/v2-sdk';
import { useAccount } from 'packages/wagmi/src';
import React, {useMemo} from 'react';
import { useFarmQuery } from 'state/farms/hooks';
import styled from 'styled-components';
import { EmptyIcon } from 'svgs';
import { vaildItem } from 'utils';
import { useV2PairsByAccount } from 'hooks/pool/useV2PairsByAccount';
import CircleLoader from 'components/Loader/CircleLoader';
import EmptyPool from './components/EmptyPool';
import PoolFilter from './components/PoolFilter';
import { createFilterPair } from './utils/filterPoolByQuery';

const MyPools: React.FC = () => {
  const [query] = useFarmQuery();
  const { address } = useAccount();
  const {data: v2Pairs, loadingData: isLoading} = useV2PairsByAccount(address);
  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair));

  const poolList = useMemo((): Pair[] => {
    return allV2PairsWithLiquidity
      ?.map((pair) => {
        if (query) {
          const filterToken = createFilterPair(query);
          if (!filterToken(pair)) return null;
        }

        return pair;
      })
      .filter(vaildItem);
  }, [query, allV2PairsWithLiquidity]);

  return (
    <Wrapper>
      <StyledWrapTitle>
        <StyledTitle>My Liquidity Pools</StyledTitle>
        <Flex flex="1 1" maxWidth={['100%', '', '420px']} justifyContent="flex-end">
          <PoolFilter />
        </Flex>
      </StyledWrapTitle>

      {
      isLoading ? (
        <ColumnCenter p="20px" my="40px" height="100%">
          <CircleLoader />
        </ColumnCenter>
      ) : (
      poolList.length === 0 ? (
              <EmptyPool />
      ) :
      <Grid
          width="100%"
          gridTemplateColumns={['1fr', '', '', 'repeat(2, 1fr)', '', '', 'repeat(3, 1fr)']}
          gridGap="26px"
        >
          {poolList.map((v2Pair) => (
            <PositionCard p="24px" key={v2Pair.liquidityToken.address} pair={v2Pair} />
          ))}
          {/* {stakingPairsQuery.map(
            (stakingPair, i) =>
              stakingPair[1] && ( // skip pairs that arent loaded
                <PositionCard
                  p="24px"
                  key={stakingInfosWithBalance[i].stakingRewardAddress}
                  pair={stakingPair[1]}
                  stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                />
              ),
          )} */}
        </Grid>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Column)`
  width: 100%;
  min-height: 300px;

  ${({ theme }) => theme.mediaQueries.sm} {
    .wrap-filter {
      width: auto;
    }
  }
  ${EmptyIcon} {
    width: 48px;
    height: 48px;
  }
`;

const StyledTitle = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
  white-space: nowrap;
`;

const StyledWrapTitle = styled(Column)`
  flex-wrap: wrap;
  height: max-content;
  margin-bottom: 24px;
  height: 100%;

  #search {
    max-width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    #search {
      max-width: 320px;
    }

    ${StyledTitle} {
      margin-right: 16px;
      margin-bottom: 0;
      font-size: 18px;
      color: #77e9ff;
    }
  }
`;

export default MyPools;
