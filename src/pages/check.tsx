import React from 'react';
import Text from 'components/Text';

const Check: React.FC = () => {
  return (
    <Text>
      {
        window &&
        Object.keys(window).map((key) => (
          <Text key={key}>{key}</Text>
        ))

      } - {String(window?.roboinu)}
    </Text>
  )
};

export default Check;