import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import IconTextButton from '../components/IconTextButton';
import { useNavigation } from '@react-navigation/native';
import ScrollIndicator from '../components/ScrollIndicator';

const RepairScreen = ({ route }) => {
  const { vertexResponse } = route.params;
  const navigation = useNavigation();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Load the Nunito_400Regular and Nunito_700Bold fonts.
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  // This function is called when the user scrolls the ScrollView.
  // It shows the scroll indicator so users know they can scroll down for more content.
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const offset = 20;
    const isScrolledToBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - offset;
    setShowScrollIndicator(!isScrolledToBottom);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Repair and recycle suggestions</Text>
      </View>
      <View style={styles.responseContainer}>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={24}>
          <Text style={styles.titleText}>Suggestion</Text>
          <Text style={styles.responseText}>{vertexResponse.suggestion}</Text>
          <Text style={styles.titleText}>Restore</Text>
          <Text style={styles.responseText}>
            {vertexResponse.repair_instructions}
          </Text>
          <Text style={styles.titleText}>Recycle</Text>
          <Text style={styles.responseText}>
            {vertexResponse.recycle_instructions}
          </Text>
        </ScrollView>
      </View>
      <ScrollIndicator isVisible={showScrollIndicator} />
      <View style={styles.buttonContainer}>
        <IconTextButton
          backgroundColor={'#5DBEA3'}
          textColor={'#FFFFFF'}
          iconColor={'#FFFFFF'}
          icon='arrow-left'
          title='BACK'
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default RepairScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 20,
  },
  responseContainer: {
    flex: 5,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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

  headerText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Nunito_700Bold',
  },
  titleText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Nunito_700Bold',
    color: '#333',
  },
  responseText: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Nunito_400Regular',
    color: '#666',
  },
  scrollIndicator: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});
