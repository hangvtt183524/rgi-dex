import React from 'react';
import Text from 'components/Text';

const Check: React.FC = () => {
  return (
    <div>
      {window && Object.keys(window).map((key) => (
        <Text key={key}>{key}</Text>
      ))}

      {window?.ethereum && Object.keys(window?.ethereum).map((key) => (
        <Text key={key}>{key}</Text>
      ))}

      <Text>
        {String(window?.ethereum?.isMetaMask)}
      </Text>
    </div>
  )
};

export default Check;