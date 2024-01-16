import Button from 'components/Button';
import { ButtonProps } from 'components/Button/types';
import CurrencySearchModal from 'components/CurrencySearchModal/CurrencySearchModal';
import CurrencyLogo from 'components/Logo/CurrencyLogo';
import Text from 'components/Text';
import { Currency } from 'config/sdk-core';
import useModal from 'hooks/useModal';
import styled from 'styled-components';
import { DownIcon } from 'svgs';
import React from 'react';
import { RowFixed } from 'components/Layout/Row';
import { StyledText } from 'components/CurrencyInputPanel/CurrencyInputPanel';

const CurrencySelect: React.FC<
    ButtonProps & {
    selectedToken?: Currency;
    otherSelectedToken?: Currency | null;
    showCommonBases?: boolean;
    commonBasesType?: string;
    handleCurrencySelect: (coin: Currency) => void;
}
> = ({
         selectedToken,
         handleCurrencySelect,
         otherSelectedToken,
         showCommonBases,
         commonBasesType,
         className = 'select-token',
         ...props
     }) => {
    const [onPresentCurrencyModal] = useModal(
        <CurrencySearchModal
            handleCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedToken}
            otherSelectedCurrency={otherSelectedToken}
            showCommonBases={showCommonBases}
            commonBasesType={commonBasesType}
        />,
        {
            modalId: 'currency-search-modal',
        },
    );
    return selectedToken ? (
        <Wrapper className={className} onClick={onPresentCurrencyModal} {...props}>
            <RowFixed gap='2px'>
                <CurrencyLogo style={{ borderRadius: '50%' }} currency={selectedToken} size={24} />
                <StyledText fontWeight={600}>
                    {selectedToken?.symbol}
                </StyledText>
                <StyledDownIcon />
            </RowFixed>
        </Wrapper>
    ) : (
        <ButtonSelectCoin onClick={onPresentCurrencyModal} {...props}>
            <CurrencyText>Select Token</CurrencyText>
            <StyledDownIcon/>
        </ButtonSelectCoin>
    );
};

const Wrapper = styled(Button)`
  padding: 0;
  background: transparent;
  border: 0;
`;

const CurrencyText = styled(Text).attrs({
    fontSize: '9px',
    fontWeight: 600,
})`
  white-space: nowrap;
  ${({ theme }) => theme.mediaQueries.sm } {
    font-size: 12px;
  }
`;

const ButtonSelectCoin = styled(Button).attrs({ scale: 'sm' })`
  padding: 16px;
  margin-bottom: 6px;
`;

const StyledDownIcon = styled(DownIcon) `
  scale: 0.7;
  ${({ theme }) => theme.mediaQueries.sm } {
    scale: 1;
  }
`

export default CurrencySelect;
