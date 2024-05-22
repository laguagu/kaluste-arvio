import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconTextButton from '../components/IconTextButton';
import LoadingModal from '../components/LoadingModal';
import { getEstimate } from '../utils/api';
import { useFonts, Nunito_600SemiBold } from '@expo-google-fonts/nunito';

// The PreviewScreen component displays a preview of the picture taken by the user.
// The user can choose to accept or retake the picture.
const PreviewScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const { imageUri, orientation, tooLarge } = route.params;
  const navigation = useNavigation();
  const userPrompt = {
    picture: imageUri,
  };

  // The handleSubmit function sends the picture to the server
  // to get an filled form with the furniture data.
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const resp = await getEstimate(userPrompt);
      navigation.navigate('PromptScreen', {
        vertexResponse: resp,
        imageUri: userPrompt.picture,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // The rotation of the image is set based on the orientation of the device when the picture was taken.
  // This ensures that the image is displayed in the same orientation as the device was in when the picture was taken.
  let rotationDegrees;
  if (orientation) {
    switch (orientation) {
      case 'PORTRAIT':
        rotationDegrees = '0deg';
        break;
      case 'LANDSCAPE_RIGHT':
        rotationDegrees = '90deg';
        break;
      case 'LANDSCAPE_LEFT':
        rotationDegrees = '-90deg';
        break;
    }
  }

  // Load the Nunito_400Regular font.
  let [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Are you happy with this picture?</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          // The image is displayed with the rotation set based on the orientation of the device when the picture was taken.
          style={[styles.image, { transform: [{ rotate: rotationDegrees }] }]}
          source={{ uri: 'data:image/png;base64,' + imageUri }}
        />
        {tooLarge ? (
          <View style={styles.tooLarge}>
            <View style={{ alignItems: 'center' }}>
              <Icon name='alert-circle' size={50} color='#FF5733' />
              <View style={{ marginTop: 5 }}>
                <Text
                  style={{
                    color: '#FF0000',
                    fontSize: 16,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  FILE TOO LARGE
                </Text>
                <Text
                  style={{
                    color: '#FF0000',
                    textAlign: 'center',
                    paddingBottom: 10,
                  }}
                >
                  Maximum picture size is 2 Mb
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.titleText}>Confirm your picture</Text>
            <Text style={styles.imageText}>
              Ensure your picture aligns with the instructions provided on the
              app's home page. You have the option to retake the picture if
              needed. Review your capture before finalizing to ensure it meets
              your expectations. A well-taken picture aids our AI in predicting
              prices and providing more precise instructions.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <IconTextButton
          icon='camera-retake'
          title='RETAKE'
          onPress={() => navigation.navigate('Root')}
          backgroundColor={'#5DBEA3'}
          textColor={'#FFFFFF'}
          iconColor={'#FFFFFF'}
        />
        {!tooLarge && (
          <IconTextButton
            icon='check'
            title='YES'
            onPress={handleSubmit}
            backgroundColor={'#5DBEA3'}
            textColor={'#FFFFFF'}
            iconColor={'#FFFFFF'}
          />
        )}
      </View>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageContainer: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 20,
  },
  tooLarge: {
    marginTop: 100,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Nunito_600SemiBold',
  },
  titleText: {
    fontSize: 16,
    marginTop: 40,
    paddingLeft: 5,
    fontFamily: 'Nunito_700Bold',
    color: '#333',
  },
  imageText: {
    fontSize: 14,
    marginTop: 20,
    paddingLeft: 5,
    fontFamily: 'Nunito_400Regular',
    color: '#666',
  },
  image: {
    borderRadius: 6,
    width: '100%',
    height: 300,
  },
});
