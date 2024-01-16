import React from 'react';
import Modal, {InjectedModalProps} from 'components/Modal';
import { ConfirmationPendingContent } from 'components/TransactionConfirmationModal';

interface ModalConfirmPendingUnStakeLiquidityProps {
    pendingText?: string;
}

const ConfirmationPendingUnStake: React.FC<InjectedModalProps & ModalConfirmPendingUnStakeLiquidityProps> = ({
   onDismiss,
   pendingText
}) => {
    return <Modal title='' onDismiss={onDismiss} width="100%" maxHeight={90} maxWidth="450px !important">
        <ConfirmationPendingContent pendingText={pendingText} />
    </Modal>
};

export default ConfirmationPendingUnStake;