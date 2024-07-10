import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getInstructions } from '../utils/api';
import Instruction from '../components/Instruction';
import InstructionPicture from '../components/InstructionPicture';
import { useFonts, Nunito_700Bold } from '@expo-google-fonts/nunito';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// HomeScreen component displays the app title and instructions with images.
const HomeScreen = () => {
  const [instructions, setInstructions] = useState([]);
  const [pictures, setPictures] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Fetch instructions and pictures from the API.
  const fetchData = async () => {
    try {
      const data = await getInstructions();
      setInstructions(data.instructions);
      setPictures(data.pictures);
    } catch (error) {
      console.error('Error fetching instructions:', error);
    }
  };

  // Load the Nunito_700Bold font.
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar />
      <View style={styles.headerContainer}>
        {/* Display the app title with an icon instead of letter 'o'. */}
        <Text style={styles.titleText}>
          arv{<Icon style={styles.titleIcon} name='dots-circle' size={24} />}
          laskuri
        </Text>
      </View>
      {/* Display the instructions and images in a ScrollView. */}
      <ScrollView style={styles.instructionContainer}>
        <View style={{ paddingBottom: 20 }}>
          <Instruction instructions={instructions} title={'Full Image'} />
          <Instruction instructions={instructions} title={'Frame'} />
          <InstructionPicture
            pictures={pictures}
            title={'good_picture_1'}
            style={styles.instructionPicture}
            symbol={<Icon name='check-circle' size={24} color='#5DBEA3' />}
          />
          <InstructionPicture
            pictures={pictures}
            title={'good_picture_2'}
            style={styles.instructionPicture}
            symbol={<Icon name='check-circle' size={24} color='#5DBEA3' />}
          />
          <Instruction instructions={instructions} title={'Lighting'} />
          <Instruction instructions={instructions} title={'Background'} />
          <InstructionPicture
            pictures={pictures}
            title={'bad_picture_1'}
            style={styles.instructionPicture}
            symbol={<Icon name='close-circle' size={24} color='#FF5733' />}
          />
          <InstructionPicture
            pictures={pictures}
            title={'bad_picture_2'}
            style={styles.instructionPicture}
            symbol={<Icon name='close-circle' size={24} color='#FF5733' />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    // Add a shadow effect to the header based on the platform.
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'Nunito_700Bold',
    color: '#5DBEA3',
  },
  titleIcon: {
    color: '#5DBEA3',
  },
  instructionContainer: {
    flex: 1,
    padding: 20,
    marginVertical: 20,
    width: '95%',
  },
  instructionPicture: {
    marginVertical: 12,
    marginLeft: '2.5%',
    borderRadius: 6,
    width: '95%',
    height: 400,
  },
});

export default HomeScreen;
