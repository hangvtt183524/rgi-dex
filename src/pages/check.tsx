import React from 'react';
import Text from 'components/Text';

const Check: React.FC = () => {
  return (
    <Text>
      {String(window?.ethereum?.isMetaMask)}
    </Text>
  )
};

export default Check;