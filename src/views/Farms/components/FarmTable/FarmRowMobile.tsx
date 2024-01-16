import { Box } from 'components/Box';
import IconButton from 'components/Button/IconButton';
import { AutoColumn } from 'components/Layout/Column';
import { RowBetween, RowFixed } from 'components/Layout/Row';
import Text from 'components/Text';
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import RoboTheme from 'styles';
import { DownIcon } from 'svgs';
import {getExplorerLink} from 'utils/getExplorer';
import LinkExternal from 'components/Link/LinkExternal';
import { RowPropsWithLoading } from '../types';
import Apr from './ColData/Apr';
import Earned from './ColData/Earned';
import Farm from './ColData/Farm';
import LockTime from './ColData/LockTime';
import ActionPanel from './FarmAction/ActionPanel';
import TotalStaked from './ColData/TotalStaked';
import Participant from './ColData/Participant';

const FarmRowMobile: React.FunctionComponent<React.PropsWithChildren<RowPropsWithLoading>> = (props) => {
  const { endTime, earned, farm, apr, userDataReady , details, participant} = props;
  const [expanded, setExpand] = useState(false);

  const handleToggle = () => setExpand(!expanded);

  return (
    <Wrapper>
      <StyledTrButton onClick={handleToggle}>
        <RowFixed>
          <Farm {...farm} />
          <LinkExternal href={getExplorerLink(details.manager, 'address', farm.token.chainId)}/>
        </RowFixed>

        {/* APR */}
        <StyledWrapAPR position="relative">
          <Text id="title" fontSize="14px" color="textSubtle" mr="8px">
            APR:
          </Text>
          <Text
            style={{
              wordBreak: 'break-all',
            }}
            fontSize="14px"
            textAlign="right"
            color="mark"
            mr={['12px', '', '24px']}
          >
            <Apr {...apr} hideButton />
          </Text>

          <IconButton
            position="absolute"
            right="24px"
            style={{
              transition: RoboTheme.transitions.fast,
              transform: `rotate(${expanded ? 180 : 0}deg)`,
            }}
          >
            <DownIcon />
          </IconButton>
        </StyledWrapAPR>
      </StyledTrButton>

      <StyledWrapMoreInfo expanded={expanded}>
        <WrapDetailInfoFarm gap="12px">
          {/* APR */}
          <RowBetween>
            <StyledTitleDetail>APR:</StyledTitleDetail>
            <RowFixed>
              <Text color="mark">
                <Apr {...props.apr} hideButton />
              </Text>
            </RowFixed>
          </RowBetween>

          {/* Staked TVL */}
            <RowBetween>
                <StyledTitleDetail>Staked TVL:</StyledTitleDetail>
                <RowFixed>
                    <TotalStaked farmData={details} />
                </RowFixed>
            </RowBetween>

          <RowBetween>
            <StyledTitleDetail>Ends In:</StyledTitleDetail>
            <RowFixed>
              <LockTime lockTime={endTime.lockTime} />
            </RowFixed>
          </RowBetween>

          {/* Earned */}
          <RowBetween>
            <StyledTitleDetail>Earned:</StyledTitleDetail>
            <RowFixed>
              <Earned {...earned} userDataReady={userDataReady} />
            </RowFixed>
          </RowBetween>

          <RowBetween>
            <StyledTitleDetail>Participant:</StyledTitleDetail>
            <RowFixed>
              <Participant total={participant?.total} />
            </RowFixed>
          </RowBetween>
        </WrapDetailInfoFarm>

        <ActionPanel {...props} expanded />
      </StyledWrapMoreInfo>
    </Wrapper>
  );
};

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 800px;
  }
`;

const collapseAnimation = keyframes`
  from {
    max-height: 800px;
  }
  to {
    max-height: 0px;
  }
`;

const Wrapper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.inputQuaternary};
  border-radius: ${({ theme }) => theme.radius.small};
`;

const StyledWrapAPR = styled(RowFixed)`
  position: relative;
  #title {
    display: none;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    #title {
      display: block;
    }
  }
`;

const StyledWrapMoreInfo = styled(Box)<{ expanded: boolean }>`
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  z-index: 0;
  padding: 0 8px;

  ${({ expanded }) =>
    expanded
      ? css`
          padding-top: 8px;
          padding-bottom: 8px;

          animation: ${expandAnimation} 300ms linear forwards;
        `
      : css`
          animation: ${collapseAnimation} 300ms linear forwards;
        `}
`;

const WrapDetailInfoFarm = styled(AutoColumn)`
  border: 1px solid ${({ theme }) => theme.colors.strokeSec};
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.small};
  margin-bottom: 24px;
`;
const StyledTrButton = styled(RowBetween)`
  cursor: pointer;
  height: 60px;
  position: relative;
  z-index: 1;
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 12px 16px;
`;

const StyledTitleDetail = styled(Text).attrs({
  color: 'textAlt3',
  fontSize: '14px',
})``;

export default FarmRowMobile;
