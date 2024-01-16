import { Flex } from 'components/Box';
import ActionButton from 'components/Button/ActionButton';
import NumericalInputMax from 'components/Input/NumericalInputMax';
import { Column } from 'components/Layout/Column';
import { RowBetween } from 'components/Layout/Row';
import Text from 'components/Text';
import React, { useMemo, useState } from 'react';

import styled from 'styled-components';
import { getFullDecimals, parseNumberDisplay } from 'utils/numbersHelper';
import { Dots } from 'styles/common';
import { Trans } from 'react-i18next';
import Link from 'components/Link';
import { urlRoute } from 'config/endpoints';
import { unwrappedToken } from 'utils/wrappedCurrency';
import { getAddressCurrency } from 'utils/addressHelpers';
import BigNumber from 'bignumber.js';
import useStakeFarms from '../../hooks/useStakeFarms';
import { useApproveStaking } from '../../hooks/useAppoveStaking';
import { FarmActionButton, StyledFarmTitleText } from '../Styled';

const Wrapper = styled(Column)``;

const FarmStake: React.FC<any> = ({ details }) => {
  const lpBalance = useMemo(() => parseNumberDisplay(details?.userData?.tokenBalance, 10, details.lpTokenDecimals), [details]);
  const isPoolEnded = useMemo(() => {
      if (details?.endTime && details?.endTime > 0) {
          return new Date(details.endTime * 1000 || 0).getTime() - Date.now() < 0;
      }

      return false;
  }, [details]);

  const [userInput, setUserInput] = useState('');
  const { onStake, submitting } = useStakeFarms(details.manager, details.poolId);

  /* Approval */
  const { isApprovePending, showApproveFlow, approveTokenButtonDisabled, handleApprove } = useApproveStaking(
    details.manager,
    details.poolId,
    details.userData.tokenBalance.toString(),
  );

  /* Approval */
  const currency0 = unwrappedToken(details?.token);
  const currency1 = unwrappedToken(details?.quoteToken);

  const handleApproveLP = () => {
      return handleApprove().then(() => {
          setUserInput('');
      });
  };

  const handleStake = () => {
    return onStake(getFullDecimals(userInput, 18).toString()).then(() => {
      setUserInput('');
    });
  };

  const urlLink = useMemo(
    () =>
      urlRoute.addLiquidity({
        inputCurrency: getAddressCurrency(currency0),
        outputCurrency: getAddressCurrency(currency1),
      }).to,
    [currency0, currency1],
  );

  const isEnoughtBalanceToApprove = details?.userData?.tokenBalance?.gt(0);
  const isValidateInput = new BigNumber(userInput.replaceAll(',', '')).gt(0);
  const isEnoughInput = new BigNumber(userInput.replaceAll(',', '')).lte(lpBalance.replaceAll(',', ''));

  return (
    <Wrapper>
      <RowBetween alignItems="flex-start !important" flex={1}>
        <Column>
          <StyledFarmTitleText>
            Your LP Tokens:
          </StyledFarmTitleText>
          <Text fontWeight={600}>{lpBalance}</Text>
        </Column>
        <Link textAlign="right" href={urlLink} fontSize="12px" color="loading">
          Get LP Tokens
        </Link>
      </RowBetween>
      <Flex my={['8px', '8px', '18px']} maxHeight={52} className="select-input-token">
        <NumericalInputMax
          value={userInput}
          radius="small"
          variant="secondary"
          onUserInput={setUserInput}
          onMax={() => {
              setUserInput(lpBalance.replaceAll(',', ''));
          }}
        />
      </Flex>
      {isPoolEnded ? (
          <FarmActionButton
              disabled
              onSubmit={async () => {}}
          >
              Pool Ended
          </FarmActionButton>
      ) : 
      showApproveFlow ? (
        <FarmActionButton
          disabled={approveTokenButtonDisabled || !userInput || !isEnoughtBalanceToApprove || !isValidateInput || !isEnoughInput}
          onSubmit={handleApproveLP}
        >
          {isApprovePending ? <Dots>Enabling</Dots> : isValidateInput ? (isEnoughInput ? <Trans>Enable {details?.lpSymbol}</Trans> : <Trans>Insufficient {details?.lpSymbol} balance</Trans>) : <Trans>Enter {details?.lpSymbol} amount</Trans>}
        </FarmActionButton>
      ) : (
        <FarmActionButton
          disabled={!userInput || submitting || !isValidateInput || !isEnoughInput}
          onSubmit={handleStake}
        >
          {submitting ? <Dots>Staking</Dots> : isValidateInput ? (isEnoughInput ? <Trans>Stake LP</Trans> : <Trans>Insufficient LP balance</Trans>) : <Trans>Enter LP amount</Trans>}
        </FarmActionButton>
      )}
    </Wrapper>
  );
};

export default FarmStake;
