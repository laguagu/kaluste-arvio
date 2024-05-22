import { Text } from 'react-native';
import React from 'react';

const MaxCharCounter = ({ input, max }) => {
  if (input.length == max) {
    return (
      <Text style={{ color: '#FF5733' }}>
        {input.length}/{max}
      </Text>
    );
  } else {
    return (
      <Text>
        {input.length}/{max}
      </Text>
    );
  }
};
export default MaxCharCounter;
