import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import IconTextButton from '../components/IconTextButton';
import { useNavigation } from '@react-navigation/native';

const ChoiceModal = ({ visible, closeModal, imageUri }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Modal animationType='fade' transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ paddingBottom: 30, fontSize: 20 }}>
              What would you like to do with this furniture piece?
            </Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <IconTextButton
                icon='hand-coin'
                title='SELL'
                onPress={() => {
                  // navigation.navigate('SellScreen', { imageUri: imageUri });
                  closeModal(); // <-- Close modal when navigation occurs
                }}
                backgroundColor={'#5DBEA3'}
                textColor={'#FFFFFF'}
                iconColor={'#FFFFFF'}
              />
              <IconTextButton
                icon='recycle'
                title='RECYCLE'
                backgroundColor={'#5DBEA3'}
                textColor={'#FFFFFF'}
                iconColor={'#FFFFFF'}
              />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <IconTextButton
                icon='hammer'
                title='REPAIR'
                onPress={() => {
                  navigation.navigate('RepairScreen', { imageUri: imageUri });
                  closeModal(); // <-- Close modal when navigation occurs
                }}
                backgroundColor={'#5DBEA3'}
                textColor={'#FFFFFF'}
                iconColor={'#FFFFFF'}
              />
              <IconTextButton
                icon='step-backward'
                title='BACK'
                onPress={() => closeModal()}
                backgroundColor={'#5DBEA3'}
                textColor={'#FFFFFF'}
                iconColor={'#FFFFFF'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChoiceModal;

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
});
