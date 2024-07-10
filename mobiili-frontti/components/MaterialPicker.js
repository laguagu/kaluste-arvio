import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  useFonts,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';

const MaterialPicker = ({ type, onMaterialSelected }) => {
  // Define the materials for each type of furniture
  const furnitureMaterials = {
    Table: [
      'Wood',
      'Glass',
      'Metal',
      'Stone',
      'Plastic/Acrylic',
      'Composite Materials',
      'Concrete',
      'Bamboo',
    ],
    Sofa: [
      'Fabric',
      'Leather',
      'Microfiber',
      'Velvet',
      'Faux leather',
      'Synthetic materials',
    ],
    Desk: ['Wood', 'Metal', 'Glass', 'Composite Materials', 'Plastic/Acrylic'],
    Chair: [
      'Wood',
      'Metal',
      'Plastic',
      'Fabric',
      'Leather',
      'Wicker/Rattan',
      'Acrylic',
    ],
    Bookcase: [
      'Wood',
      'Metal',
      'Glass',
      'Composite Materials',
      'Plastic/Acrylic',
    ],
    Unknown: [
      'Wood',
      'Metal',
      'Glass',
      'Leather',
      'Wicker/Rattan',
      'Acrylic',
      'Composite Materials',
      'Plastic/Acrylic',
      'Stone',
      'Bamboo',
      'Concrete',
      'Fabric',
      'Faux Leather',
      'Natural Fiber',
      'Synthetic',
      'Vinyl',
      'Other',
    ],
  };

  // Set the default type to 'Unknown' if the type is not valid
  if (!type || !furnitureMaterials[type] || type === 'Unknown') {
    type = 'Unknown';
  }

  const [selectedMaterial, setSelectedMaterial] = useState('Unknown');


  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Picker
        selectedValue={selectedMaterial}
        itemStyle={styles.picker}
        onValueChange={(itemValue) => {
          setSelectedMaterial(itemValue);
          onMaterialSelected(itemValue); // Pass the selected material to the parent component immediately when a new material is selected
        }}
      >
        {/* Add 'Unknown' as the first item in the list */}
        <Picker.Item
          style={styles.item}
          key='Unknown'
          label='Unknown'
          value='Unknown'
        />
        {/* Map the materials for the selected type */}
        {furnitureMaterials[type].map((material) => (
          <Picker.Item key={material} label={material} value={material} />
        ))}
      </Picker>
    </View>
  );
};

export default MaterialPicker;

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
