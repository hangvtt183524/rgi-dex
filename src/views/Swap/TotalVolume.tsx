import styled from 'styled-components';
import { Grid } from 'components/Box';
import Text from 'components/Text';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { isAddress } from 'utils/addressHelpers';
import { ROBO } from 'config/tokens';
import { SupportedChainId } from 'config/sdk-core';
import { useSelectedChainNetwork } from 'state/user/hooks';
import { getTotalVolumeData } from 'subgraph/contexts/TokenData';
import { Card } from 'components/Card';
import { formattedNum } from 'subgraph/contexts/utils';
import { isMobile } from 'react-device-detect'
import Marquee from 'react-fast-marquee';
import RoboTheme from 'styles';
import { RowBetween } from 'components/Layout/Row';
import useActiveWeb3React from 'hooks/web3React/useActiveWeb3React';
import { useAccount } from 'wagmi';

const TotalVolume: React.FC = () => {
    const { address } = useAccount();
    const { chainId } = useActiveWeb3React();
    const chainNetwork = useSelectedChainNetwork();
    const actualChain = useMemo(() => (address ? chainId : chainNetwork), [chainId, chainNetwork, address]);

    const [totalVolumes, setTotalVolumes] = useState([]);
    const [totalVolumesMobile, setTotalVolumesMobile] = useState([]);
    const rbifAddress = useMemo(() => (ROBO[actualChain]?.address?.toLowerCase()), [actualChain]);
    const handleLoadingTotalVolume = useCallback(() => {
        if (rbifAddress && isAddress(rbifAddress)) {
            getTotalVolumeData(rbifAddress)
                .then((data) => {
                    setTotalVolumes([
                        {
                            key: 'oneDay',
                            title: '24H VOLUME',
                            value: formattedNum(data.oneDayVolumeUSD || 0, true)
                        },
                        {
                            key: 'oneWeek',
                            title: '7 DAYS VOLUME',
                            value: formattedNum(data.oneWeekVolumeUSD || 0, true)
                        },
                        {
                            key: 'oneMonth',
                            title: '30 DAYS VOLUME',
                            value: formattedNum(data.oneMonthVolumeUSD || 0, true)
                        },
                        {
                            key: 'oneYear',
                            title: '1 YEAR VOLUME',
                            value: formattedNum(data.oneYearVolumeUSD || 0, true)
                        },
                    ]);
                    setTotalVolumesMobile([
                        {
                            key: 'oneDay',
                            title: '24h:',
                            value: formattedNum(data.oneDayVolumeUSD || 0, true)
                        },
                        {
                            key: 'oneWeek',
                            title: '7 Days:',
                            value: formattedNum(data.oneWeekVolumeUSD || 0, true)
                        },
                        {
                            key: 'oneMonth',
                            title: '30 Days:',
                            value: formattedNum(data.oneMonthVolumeUSD || 0, true)
                        },
                        {
                            key: 'oneYear',
                            title: '1 Year:',
                            value: formattedNum(data.oneYearVolumeUSD || 0, true)
                        },
                    ])
                })
                .catch(() => {
                });
        } else {
            setTotalVolumes([
                {
                    key: 'oneDay',
                    title: '24H VOLUME',
                    value: formattedNum(0, true)
                },
                {
                    key: 'oneWeek',
                    title: '7 DAYS VOLUME',
                    value: formattedNum(0, true)
                },
                {
                    key: 'oneMonth',
                    title: '30 DAYS VOLUME',
                    value: formattedNum(0, true)
                },
                {
                    key: 'oneYear',
                    title: '1 YEAR VOLUME',
                    value: formattedNum(0, true)
                },
            ]);
            setTotalVolumesMobile([
                {
                    key: 'oneDay',
                    title: '24h:',
                    value: formattedNum(0, true)
                },
                {
                    key: 'oneWeek',
                    title: '7 Days:',
                    value: formattedNum(0, true)
                },
                {
                    key: 'oneMonth',
                    title: '30 Days:',
                    value: formattedNum(0, true)
                },
                {
                    key: 'oneYear',
                    title: '1 Year:',
                    value: formattedNum(0, true)
                },
            ])
        }
    }, [rbifAddress, actualChain])

    useEffect(() => {
        handleLoadingTotalVolume();
    }, [actualChain]);
    
    if (isMobile) return (
        <StyledMobileWrapper>
            <Text gradient={RoboTheme.colors.gradients.primary} style={{paddingRight: '18px'}}>
                Volume
            </Text>
            <Marquee gradient={false}>
                <StyledMobileWrapperContent>
                        {totalVolumesMobile.map((totalVolume) => {
                            return <>
                                <Text whiteSpace="nowrap" color="textSubtle" style={{paddingRight: '9px'}}>{totalVolume.title}</Text>
                                <Text whiteSpace="nowrap" textAlign="center" style={{paddingRight: '18px'}}>{totalVolume.value?.toString().replace('US', '')}</Text>
                            </>
                        })}
                </StyledMobileWrapperContent>
            </Marquee>
        </StyledMobileWrapper>
    )

    return (
        <StyledContainer>
            {totalVolumes.map((totalVolume) => (
                <StyledWrapper key={totalVolume.key}>
                    <Text fontSize="12px" color="textSubtle">{totalVolume.title}</Text>
                    <Text textAlign="center" fontSize="16px" width='100%'>{totalVolume.value}</Text>
                </StyledWrapper>))}
        </StyledContainer>
    )
};

const StyledContainer = styled(Grid)`
  max-width: ${({ theme }) => theme.siteWidth}px;
  width: 100%;
  margin-bottom: 16px;
  overflow-x: hidden;

  grid-template-columns: 1fr;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: flex-start;
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 16px;
    grid-template-columns: 0.75fr 0.75fr 0.75fr 0.75fr;
  }
`;

const StyledWrapper = styled(Card).attrs({ variant: 'form', padding: '18px !important', radius: 'medium' })`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: fit-content;
  }
`;

const StyledMobileWrapper = styled(Card).attrs({ variant: 'form', padding: '18px !important', radius: 'medium' })`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
  width: 100%!important;
  margin-bottom: 16px;
`;

const StyledMobileWrapperContent = styled(RowBetween)`
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
`
export default TotalVolume;