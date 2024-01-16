import { RowCenter } from 'components/Layout/Row';
import Text from 'components/Text';
import React, { useEffect, useMemo, useState } from 'react';
import { LockTimeProps } from '../../types';

const LockTime: React.FunctionComponent<React.PropsWithChildren<LockTimeProps>> = ({ lockTime }) => {
  const countDownDate = new Date((lockTime || 0) * 1000).getTime();

  const [countDown, setCountDown] = useState(
      countDownDate - Date.now()
  );

  const countDownFormatted = useMemo(() => {
    if (!lockTime) return undefined;
    if (lockTime < 0) return 'Infinity';
    if (countDown <= 0) return 'Pool Ended';

    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return `${days < 10 ? '0' : ''}${days}D:${hours < 10 ? '0' : ''}${hours}H:${minutes < 10 ? '0' : ''}${minutes}M:${seconds < 10 ? '0' : ''}${seconds}S`;
  }, [countDown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

    return (
    <RowCenter>
      <Text fontSize={['12px', '', '', '', '', '14px']}>
        {countDownFormatted === undefined ? '-' : countDownFormatted}
      </Text>
    </RowCenter>
  );
};

export default LockTime;
