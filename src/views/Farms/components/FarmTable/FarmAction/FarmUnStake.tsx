import { Flex } from 'components/Box';
import { Column } from 'components/Layout/Column';
import Text from 'components/Text';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Dots } from 'styles/common';
import { isNaNZero, parseNumberDisplay } from 'utils/numbersHelper';
import useModal from 'hooks/useModal';
import useUnstakeFarms from '../../hooks/useUnstakeFarms';
import { RowPropsWithLoading } from '../../types';
import ConfirmUnStakeModal from './ModalConfirmUnStakeLiquidity';
import ConfirmationPendingUnStake from './ModalConfirmUnStakeLiquidity/ConfirmationPendingUnStake';
import { FarmActionButton, StyledFarmTitleText } from '../Styled';

const Wrapper = styled(Column)``;

const FarmUnStake: React.FC<RowPropsWithLoading> = ({ details, endTime }) => {
  const lpStakeBalance = useMemo(
    () => parseNumberDisplay(details?.userData?.stakedBalance, 18, details.lpTokenDecimals),
    [details],
  );

  const { onUnstake, pendingTxn, attemptingTxt } = useUnstakeFarms(details.manager, details.poolId);

  const isPoolEnded = useMemo(() => {
        if (endTime?.lockTime && endTime?.lockTime > 0) {
            return new Date(endTime.lockTime * 1000 || 0).getTime() - Date.now() < 0;
        }

        return false;
  }, [details]);

  const handleConfirmUnStake = () => {
    return onUnstake(details?.userData?.stakedBalance.toString()).then(() => {});
  };

  const [onPresentModalConfirmUnStake] = useModal(
      <ConfirmUnStakeModal
          onConfirm={handleConfirmUnStake}
      />,
      {
          modalId: 'modal-unstake',
          updateOnPropsChange: true,
      }
  );

  const [onPresentModalConfirmPendingUnStake, onDismissModalConfirmPendingUnStake] = useModal(
        <ConfirmationPendingUnStake
            pendingText=""
        />,
        {
            modalId: 'modal-pending-unstake',
            updateOnPropsChange: true,
        }
  );

  const handleUnStake = async () => {
      onPresentModalConfirmUnStake();
  };

  useEffect(() => {
        if (attemptingTxt) {
            onPresentModalConfirmPendingUnStake();
        } else {
            onDismissModalConfirmPendingUnStake();
        }
  }, [attemptingTxt]);

  return (
    <Wrapper>
      <Column flex={1}>
        <StyledFarmTitleText>
          My LP Staked:
        </StyledFarmTitleText>
        <Text fontWeight={600}>{lpStakeBalance}</Text>
      </Column>
      <Flex my={['8px', '8px', '18px']} maxHeight={52} />

      {isPoolEnded ? (
          <FarmActionButton
              disabled
              onSubmit={async () => {}}
          >
              Pool Ended
          </FarmActionButton>
      ) : (
          <FarmActionButton
              disabled={isNaNZero(details?.userData?.stakedBalance) || pendingTxn}
              onSubmit={handleUnStake}
          >
              {pendingTxn ? <Dots>Unstaking</Dots> : 'Unstake'}
          </FarmActionButton>
      )}
    </Wrapper>
  );
};

export default FarmUnStake;
