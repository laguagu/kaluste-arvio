import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';

// Instruction component displays the instruction text.
const Instruction = ({ instructions, title }) => {
  // Load the Nunito_400Regular font.
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return instructions.map((instruction) => {
    // If the instruction title matches the title passed in as a props,
    // return id and instruction text as a Text component.
    if (instruction.instruction_title === title) {
      return (
        <Text key={instruction.id} style={styles.instructionText}>
          {instruction.id + '. ' + instruction.instruction_text}
        </Text>
      );
    }
    return null;
  });
};

export default Instruction;

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    paddingVertical: 8,
    paddingLeft: 14,
  },
});
