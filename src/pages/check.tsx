import React from 'react';
import Text from 'components/Text';

const Check: React.FC = () => {
  return (
    <Text>
      {
        JSON.stringify(window.ethereum)
      }
    </Text>
  )
};

export default Check;