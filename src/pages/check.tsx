import React from 'react';
import Text from 'components/Text';

const Check: React.FC = () => {
  return (
    <Text>
      {
        window &&
        Object.keys(window?.window).map((key) => (
        <Text key={key}>{key}</Text>
        ))

      }
    </Text>
  )
};

export default Check;