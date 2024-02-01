import React from 'react';
import Text from 'components/Text';

const Check: React.FC = () => {
  return (
    <div>
      <Text>
        {String(window)}
      </Text>

      {window?.ethereum && (Object.keys(window?.ethereum).map((field) => (
        <Text key={field}>
          {String(window?.ethereum[field])}
        </Text>
      )))}

      <Text>
        {String(window?.ethereum?.isMetaMask)}
      </Text>
    </div>
  )
};

export default Check;