import React from 'react';
import { Image, View, Text, StyleSheet, Platform } from 'react-native';
import { API_MEDIA_DATA } from '@env';

// InstructionPicture component displays an image with a symbol in the top right corner.
const InstructionPicture = ({ pictures, title, style, symbol }) => {
  // Map through the pictures array and return the image with the matching title.
  return pictures.map((picture, index) => {
    if (picture.title === title) {
      return (
        // Add a shadow effect to the image.
        <View key={index} style={styles.shadow}>
          <Image
            source={{ uri: API_MEDIA_DATA + picture.image_url }}
            style={style}
          />
          {/* Add a symbol to the image in the top right corner 
              indicating the image is good or bad. */}
          <View style={styles.symbol}>
            <Text style={{ fontSize: 20 }}>{symbol}</Text>
          </View>
        </View>
      );
    }
  });
};

export default InstructionPicture;

const styles = StyleSheet.create({
  symbol: {
    position: 'absolute',
    right: 18,
    top: 20,
    backgroundColor: '#ffffff',
    padding: 1,
    borderRadius: 4,
  },
  shadow: {
    overflow: 'hidden',
    // Add a shadow effect to the image based on the platform.
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
