import BigNumber from 'bignumber.js';
import Flex from 'components/Box/Flex';
import IconButton from 'components/Button/IconButton';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import ButtonItemGroup from 'components/ButtonGroup/ButtonItemGroup';
import { Card } from 'components/Card';
import CurrencySelect from 'components/CurrencySelect';
import NumericalInput from 'components/Input/NumericalInput';
import { RowBetween, RowMiddle, Row } from 'components/Layout/Row';
import Skeleton from 'components/Skeleton';
import Text from 'components/Text';
import { useAccount } from 'packages/wagmi/src';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { getBalanceAmount, getFullDecimals, parseNumberDisplay } from 'utils/numbersHelper';
import { Column } from 'components/Layout/Column';
import { SelectInputTokenProps } from './types';
import { FiatValue } from './FiatValue';

const percents = [25, 50, 75, 100];
const CurrencyInputPanel: React.FC<SelectInputTokenProps> = ({
                                                                 selectedToken,
                                                                 handleUserInput,
                                                                 handleCurrencySelect,
                                                                 handleMax,
                                                                 otherSelectedToken,
                                                                 value,
                                                                 balance,
                                                                 error,
                                                                 disabled,
                                                                 commonBasesType,
                                                                 disabledPercent,
                                                                 hideBalance = false,
                                                                 fiatValue,
                                                                 priceImpact,
                                                                 ...props
                                                             }) => {
    const { isConnected } = useAccount();
    const _handleMaxBalance = useCallback(
        (percent = 100) => {
            if (!balance) return;
            const percentTotal = balance.multipliedBy(percent / 100).integerValue(BigNumber.ROUND_HALF_CEIL);

            const _formatVal =
                getBalanceAmount(percentTotal, selectedToken.decimals).toString(10) !== 'NaN'
                    ? getBalanceAmount(percentTotal, selectedToken.decimals).toString(10)
                    : '0';
            if (handleMax) {
                handleMax(_formatVal);
            } else {
                handleUserInput(_formatVal);
            }
        },
        [balance, selectedToken, handleMax, handleUserInput],
    );

    const percentInputWithBalance =
        !hideBalance && balance
            ? parseInt(getFullDecimals(value, selectedToken?.decimals).dividedBy(balance).multipliedBy(100).dp(0).toString())
            : 0;

    return (
        <Wrapper variant="panel" scale="sm" {...props}>
            <RowBetween mb={selectedToken && isConnected ? '6px' : 'unset'}>
                <CurrencySelect
                    style={{
                        height: '32px',
                    }}
                    selectedToken={selectedToken}
                    otherSelectedToken={otherSelectedToken}
                    handleCurrencySelect={handleCurrencySelect}
                    showCommonBases
                    commonBasesType={commonBasesType}
                />
                {selectedToken && isConnected && !hideBalance ? (
                    <IconButton alignItems="flex-start" onClick={() => _handleMaxBalance()} height="20px">
                        <Row>
                            <StyledText >
                                Balances
                            </StyledText>
                            {balance?.gte(0) ? (
                                <StyledTextBalance fontWeight={500}>
                                    {parseNumberDisplay(balance, selectedToken.decimals, selectedToken.decimals)}
                                </StyledTextBalance>
                            ) : (
                                <Skeleton width="24px" height="18px" />
                            )}
                        </Row>
                    </IconButton>
                ) : (
                    <></>
                )}
            </RowBetween>

            <Column mt="4px" mb="8px">
                <Flex maxHeight={56} className="select-input-token">
                    <NumericalInput
                        error={!!error}
                        disabled={disabled}
                        className="token-amount-input"
                        value={value ?? ''}
                        onUserInput={(val) => {
                            handleUserInput(val);
                        }}
                        color="text"
                        variant="transparent"
                    />
                </Flex>
                <FiatValue fiatValue={fiatValue} priceImpact={priceImpact} />
            </Column>
            {!disabledPercent && !hideBalance && isConnected && (
                <ButtonGroup>
                    {percents.map((percent) => (
                        <StyledButtonItemGroup
                            key={percent}
                            active={percentInputWithBalance === percent}
                            onClick={() => _handleMaxBalance(percent)}
                        >
                            <StyledText>
                                {percent}%
                            </StyledText>
                        </StyledButtonItemGroup>
                    ))}
                </ButtonGroup>
            )}
        </Wrapper>
    );
};

const Wrapper = styled(Card)`
  border-radius: ${({ theme }) => theme.radius.small};
  box-shadow: ${({ theme }) => theme.shadows.normal};
  padding: 8px 10px;
  .token-amount-input {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 20px;
    border-radius: ${({ theme }) => theme.radius.medium};

    .token-amount-input {
      font-size: 28px;
    }
  }
`;

const StyledButtonItemGroup = styled(ButtonItemGroup)`
  font-size: 12px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 0 9px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    height: 28px;
    padding: 0 14px;
  }
`;
export const StyledText = styled(Text) `
  margin-right: 4px;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 9px;
  ${({ theme }) => theme.mediaQueries.xs } {
    font-size: 12px;
  }
`;

const StyledTextBalance = styled(Text) `
  max-width: 90px;
  font-size: 9px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.mediaQueries.xs } {
    font-size: 12px !important;
    max-width: 180px;
  }
`
export default CurrencyInputPanel;
