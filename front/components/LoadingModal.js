import React from 'react';
import { Modal, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';

const LoadingModal = ({ visible }) => {
  // Load the Nunito_400Regular font.
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>
            Please wait while AI is processing your request...
          </Text>
          <ActivityIndicator size='large' color='#5DBEA3' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },
});

export default LoadingModal;
