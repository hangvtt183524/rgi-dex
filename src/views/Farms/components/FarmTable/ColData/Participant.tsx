import { RowCenter } from 'components/Layout/Row';
import Text from 'components/Text';
import React from 'react';
import { TotalParticipantProps } from '../../types';

const Participant: React.FunctionComponent<React.PropsWithChildren<TotalParticipantProps>> = ({ total }) => {
    return (
        <RowCenter>
            <Text fontSize={['12px', '', '', '', '', '14px']}>
                {total === undefined ? '-' : total}
            </Text>
        </RowCenter>
    );
};

export default Participant;