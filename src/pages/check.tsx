import React from 'react';
import Text from 'components/Text';

const Check: React.FC = () => {
  return (
    <div>
      <Text>
        {String(window)}
      </Text>

      <Text>
        {String(window?.ethereum)}
      </Text>

      <Text>
        {String(window?.ethereum?.isMetaMask)}
      </Text>
    </div>
  )
};

export default Check;