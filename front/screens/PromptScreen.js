import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import IconTextButton from '../components/IconTextButton';
import LoadingModal from '../components/LoadingModal';
import { getEstimate, getRepair } from '../utils/api';
import MaterialPicker from '../components/MaterialPicker';
import ConditionPicker from '../components/ConditionPicker';
import MaxCharCounter from '../components/MaxCharCounter';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import ScrollIndicator from '../components/ScrollIndicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// This component is the screen where the user can input additional information about the item.
// It is shown after the user has taken a picture and the app has received a response from the server which contains
// the type, brand, model, color, condition and dimensions of the item based on the picture user sent.
const PromptScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { vertexResponse, imageUri } = route.params;
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [userPrompt, setUserPrompt] = useState({
    picture: imageUri,
    type: '',
    brand: '',
    model: '',
    material: '',
    color: '',
    condition: '',
    age: 0,
    dimensions: '',
    defects: '',
  });

  // This useEffect hook is called when the component is first rendered.
  // It sets the userPrompt state to the values from the vertexResponse.
  useEffect(() => {
    // If the vertexResponse contains an error, set the error state.
    if (vertexResponse.hasOwnProperty('error')) {
      setError(vertexResponse.error);
    } else {
      setUserPrompt({
        ...userPrompt,
        type: vertexResponse.type,
        brand: vertexResponse.brand,
        model: vertexResponse.model,
        color: vertexResponse.color,
        condition: vertexResponse.condition,
        age: vertexResponse.age,
        dimensions: `${vertexResponse.dimensions.length}cm x ${vertexResponse.dimensions.width}cm x ${vertexResponse.dimensions.height}cm`,
      });
    }
  }, []);

  // This function is called when the user presses the "PRICE" button.
  // It calls the getEstimate function from the api.js file and navigates to the ResponseScreen.
  const handleSubmitSell = async () => {
    setLoading(true);
    try {
      const resp = await getEstimate(userPrompt);
      navigation.navigate('ResponseScreen', {
        vertexResponse: resp,
        imageUri: imageUri,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // This function is called when the user presses the "REPAIR" button.
  // It calls the getRepair function from the api.js file and navigates to the RepairScreen.
  const handleSubmitRepair = async () => {
    setLoading(true);
    try {
      const resp = await getRepair(userPrompt);
      navigation.navigate('RepairScreen', {
        vertexResponse: resp,
        imageUri: imageUri,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // This function is called when the user scrolls the ScrollView.
  // It shows the scroll indicator so users know they can scroll down for more content.
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const offset = 20;
    const isScrolledToBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - offset;
    setShowScrollIndicator(!isScrolledToBottom);
  };

  // Load the Nunito_400Regular and Nunito_700Bold fonts.
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Please fill out or correct the following fields
          </Text>
        </View>
        <View style={styles.responceContainer}>
          {error !== '' ? (
            <View style={styles.errorContainer}>
              <Icon
                name='alert-circle'
                size={50}
                color='#FF5733'
                style={{ marginTop: 20 }}
              />
              <Text style={styles.errorText}>{error}</Text>
              <Icon />
            </View>
          ) : (
            <ScrollView onScroll={handleScroll} scrollEventThrottle={24}>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={styles.labelText}>Type</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userPrompt.type}
                    onChangeText={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        type: value,
                      })
                    }
                  />
                  <Text style={styles.labelText}>Brand</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userPrompt.brand}
                    onChangeText={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        brand: value,
                      })
                    }
                  />
                  <Text style={styles.labelText}>Model</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userPrompt.model}
                    onChangeText={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        model: value,
                      })
                    }
                  />
                  <Text style={styles.labelText}>Color</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userPrompt.color}
                    onChangeText={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        color: value,
                      })
                    }
                  />
                  <Text style={styles.labelText}>Age</Text>
                  <TextInput
                    keyboardType='numeric'
                    style={styles.textInput}
                    value={String(userPrompt.age)}
                    onChangeText={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        age: isNaN(value) ? 0 : parseInt(value),
                      })
                    }
                  />
                  <Text style={styles.labelText}>Dimensions</Text>
                  <TextInput
                    style={styles.textInput}
                    value={userPrompt.dimensions}
                    onChangeText={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        dimensions: value,
                      })
                    }
                  />

                  <Text style={styles.labelText}>Material</Text>
                  <MaterialPicker
                    type={vertexResponse.type}
                    onMaterialSelected={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        material: value,
                      })
                    }
                  />
                  <Text style={styles.labelText}>Condition</Text>
                  <ConditionPicker
                    onConditionSelected={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        condition: value,
                      })
                    }
                  />
                  <Text style={styles.labelText}>
                    Defects (optional){' '}
                    <MaxCharCounter input={userPrompt.defects} max={200} />
                  </Text>
                  <TextInput
                    editable={true}
                    multiline={true}
                    maxLength={200}
                    style={styles.multilineTextInput}
                    value={userPrompt.defects}
                    onChangeText={(value) =>
                      setUserPrompt({
                        ...userPrompt,
                        defects: value,
                      })
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          )}
          <ScrollIndicator isVisible={showScrollIndicator} />
        </View>
        {error !== '' ? (
          <View style={styles.buttonContainer}>
            <IconTextButton
              icon='arrow-u-right-top'
              title='TRY AGAIN'
              onPress={() => navigation.goBack()}
              backgroundColor={'#5DBEA3'}
              textColor={'#FFFFFF'}
              iconColor={'#FFFFFF'}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <IconTextButton
              backgroundColor={'#5DBEA3'}
              textColor={'#FFFFFF'}
              iconColor={'#FFFFFF'}
              icon='backup-restore'
              title='RETRY'
              onPress={() => {
                navigation.navigate('Root');
              }}
            />
            <IconTextButton
              icon='hammer'
              title='REPAIR'
              onPress={handleSubmitRepair}
              backgroundColor={'#5DBEA3'}
              textColor={'#FFFFFF'}
              iconColor={'#FFFFFF'}
            />
            <IconTextButton
              backgroundColor={'#5DBEA3'}
              textColor={'#FFFFFF'}
              iconColor={'#FFFFFF'}
              icon='currency-eur'
              title='PRICE'
              onPress={handleSubmitSell}
            />
          </View>
        )}
        <LoadingModal visible={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PromptScreen;

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 20,
  },
  responceContainer: {
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
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Nunito_700Bold',
  },
  errorText: {
    color: '#FF5733',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    marginTop: 20,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    padding: 10,
    color: '#333',
    borderColor: '#5DBEA3',
    fontFamily: 'Nunito_400Regular',
  },
  multilineTextInput: {
    height: 120,
    margin: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    padding: 10,
    paddingTop: 10,
    color: '#333',
    borderColor: '#5DBEA3',
  },
  labelText: {
    paddingTop: 8,
    paddingLeft: 22,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Nunito_700Bold',
  },
});
