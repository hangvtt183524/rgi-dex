import styled from 'styled-components';
import ActionButton from 'components/Button/ActionButton';
import Text from 'components/Text';

export const StyledFarmTitleText = styled(Text)`
  color: ${({theme}) => theme.colors.textSubtle};
  font-size: 12px;
  margin-bottom: 12px;
`

export const FarmActionButton = styled(ActionButton)`
  width: 100%;
  fontSize: 14px;
`