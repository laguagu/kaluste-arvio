import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  useFonts,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';

const ConditionPicker = ({ onConditionSelected, style }) => {
  // Define the available conditions
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor', 'Unknown'];

  const [selectedCondition, setSelectedCondition] = useState('Unknown');

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={style}>
      <Picker
        itemStyle={styles.picker}
        selectedValue={selectedCondition}
        onValueChange={(itemValue) => {
          setSelectedCondition(itemValue);
          onConditionSelected(itemValue);
        }}
      >
        {/* Map the conditions */}
        {conditions.map((condition) => (
          <Picker.Item key={condition} label={condition} value={condition} />
        ))}
      </Picker>
    </View>
  );
};

export default ConditionPicker;

const styles = StyleSheet.create({
  picker: {
    height: 60,
    margin: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#5DBEA3',
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    textAlign: 'left',
  },
});
