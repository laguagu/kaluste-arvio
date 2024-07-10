import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';

// The CameraScreen component allows the user to take a picture with the camera
// or select an image from the phone gallery.
const CameraScreen = () => {
  const [hasCameraPermission, setPermission] = useState(null);
  // const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // Tämä rivi aiheuttaa ongelmia
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [subscription, setSubscription] = useState(null);
  const camera = useRef(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // // The useEffect hook asks for camera permission when the component mounts.
  useEffect(() => {
    askCameraPermission();
  }, []);

  // // This useEffect hook subscribes to the accelerometer when the CameraScreen comes into focus
  // // and unsubscribes when it goes out of focus.
  useEffect(() => {
    if (isFocused) {
      _subscribe();
    } else {
      _unsubscribe();
    }
  }, [isFocused]);

  // // The _subscribe function sets up a listener on the accelerometer.
  // // This listener updates the orientation state variable based on the accelerometer data.
  const _subscribe = useCallback(() => {
    // If a subscription already exists, unsubscribe before subscribing again.
    if (subscription) {
      _unsubscribe();
    }
    setSubscription(
      Accelerometer.addListener(({ x, y }) => {
        // Check if the device is in portrait or landscape orientation
        // by comparing the absolute values of x and y.
        if (Math.abs(x) < Math.abs(y)) {
          setOrientation('PORTRAIT');
        } else {
          // Check if the device is in landscape right or left orientation
          // by checking if x is of positive or negative value.
          if (x > 0) {
            setOrientation('LANDSCAPE_RIGHT');
          } else {
            setOrientation('LANDSCAPE_LEFT');
          }
        }
      })
    );
  }, [subscription]);

  // // The _unsubscribe function removes the accelerometer listener when it is not needed anymore,
  // // which is typicaly when the CameraScreen goes out of focus.
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // // The askCameraPermission function asks the user to grant permission to the expo camera.
  // // If the user does not grant permission, the hasCameraPermission state variable is set to false.
  const askCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status == 'granted');
    } catch (error) {
      console.error(error);
    }
  };

  // // The takePicture function takes a picture with the camera and navigates to the PreviewScreen.
  // // The base64: true, line includes the base64 representation of the image in the photo object.
  const takePicture = async () => {
    try {
      const photo = await camera.current.takePictureAsync({
        base64: true,
      });
      const pictureInfo = await FileSystem.getInfoAsync(photo.uri);
      const size = pictureInfo.size / (1024 * 1024);
      if (size > 2) {
        navigation.navigate('PreviewScreen', {
          imageUri: photo.base64,
          orientation: orientation,
          tooLarge: true,
        });
      } else {
        navigation.navigate('PreviewScreen', {
          imageUri: photo.base64,
          orientation: orientation,
          tooLarge: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // // The openGallery function opens the gallery for the user to select an image and navigates to the PreviewScreen.
  // // The base64: true, line includes the base64 representation of the image in the result object.
  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });
      if (!result.canceled) {
        const pictureInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
        const size = pictureInfo.size / (1024 * 1024);
        if (size > 2) {
          navigation.navigate('PreviewScreen', {
            imageUri: result.assets[0].base64,
            orientation: 'PORTRAIT',
            tooLarge: true,
          });
        } else {
          navigation.navigate('PreviewScreen', {
            imageUri: result.assets[0].base64,
            orientation: 'PORTRAIT',
            tooLarge: false,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // // The toggleCameraType function toggles between the front and back camera.
  // // It does this by checking the current camera type and setting the camera type to the opposite type.
  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={styles.container}>
      {/* {hasCameraPermission ? (
        <View style={{ flex: 1, maxHeight: '90%' }}>
          {isFocused && (
            <Camera
              style={{
                marginTop: '3.5%',
                flex: 1,
                minWidth: '95%',
                minHeight: '80%',
              }}
              type={cameraType}
              ref={camera}
            />
          )}
        </View>
      ) : (
        <Text>No access to camera</Text>
      )} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 35,
        }}
      >
        <MaterialCommunityIcons
          name='image-multiple-outline'
          size={35}
          color='black'
          onPress={openGallery}
        ></MaterialCommunityIcons>
        <TouchableOpacity onPress={takePicture}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'gray',
              borderRadius: 60,
              borderColor: 'black',
              borderWidth: 3,
              marginHorizontal: 90,
            }}
          />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name='camera-flip-outline'
          size={37}
          color='black'
          onPress={toggleCameraType}
        ></MaterialCommunityIcons>
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraScreen;
