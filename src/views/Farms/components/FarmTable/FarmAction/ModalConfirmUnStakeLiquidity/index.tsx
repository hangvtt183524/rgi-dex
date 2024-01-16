import React, { useCallback } from 'react';
import Modal, {InjectedModalProps} from 'components/Modal';
import {Trans} from 'react-i18next';
import styled from 'styled-components';
import {AutoColumn} from 'components/Layout/Column';
import Image from 'components/Image';
import Text from 'components/Text';
import Button from 'components/Button/Button';
import { Grid } from 'components/Box';
import IconButton from 'components/Button/IconButton';
import {RowCenter} from 'components/Layout/Row';
import RoboTheme from 'styles';

interface ModalConfirmUnStakeLiquidityProps {
    onConfirm: () => void;
}

const ConfirmUnStakeModal: React.FC<InjectedModalProps & ModalConfirmUnStakeLiquidityProps> = ({
    onConfirm,
    onDismiss
}) => {
    const handleOnDismiss = useCallback(() => {
        onDismiss();
    }, [onDismiss]);

    const handleOnConfirm = useCallback(() => {
        onDismiss();
        onConfirm();
    }, [onConfirm]);
    
    return (
        <Modal title='' maxWidth="450px !important" maxHeight={90} onDismiss={handleOnDismiss}>
            <Wrapper>
                <Section>
                    <AutoColumn pb="24px" gap="24px" justify="center">
                        <Image
                            src="/assets/images/failure-action.png"
                            height={80}
                            width={80}
                            className="triangle-error"
                            alt="failure-action"
                        />
                        <Text fontSize="18px">Unstake</Text>
                        <Text color="textSubtle" textAlign="center">
                            Unstake may cause the loss of all rewards being farmed.
                            Please Harvest all rewards before unstaking
                        </Text>
                    </AutoColumn>
                </Section>
                <BottomSection gap="12px">
                    <Grid gridTemplateColumns="repeat(2, auto)">
                        <IconButton height="100% !important" scale="lg" onClick={handleOnDismiss}>
                            <RowCenter height="100%">
                                <Text fontWeight={600} fontSize="16px" gradient={RoboTheme.colors.gradients.primary}>
                                    <Trans>Cancel</Trans>
                                </Text>
                            </RowCenter>
                        </IconButton>

                        <Button onClick={handleOnConfirm}>
                            <Text fontWeight={600} fontSize="16px">
                                <Trans>Confirm</Trans>
                            </Text>
                        </Button>
                    </Grid>
                </BottomSection>
            </Wrapper>
        </Modal>
    )
};

const Wrapper = styled.div`
  width: 100%;
  .success-icon {
    transform: scale(0.5);
  }
  .triangle-error {
    path {
      stroke: ${({ theme }) => theme.colors.failure};
    }
  }
`;

const Section = styled(AutoColumn)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '0' : '0')};
`;

const BottomSection = styled(Section)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-bottom: 10px;
`;

export default ConfirmUnStakeModal;