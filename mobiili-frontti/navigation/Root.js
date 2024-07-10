import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name='home-city-outline'
              size={size}
              color={focused ? '#5DBEA3' : '#707070'}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Camera'
        component={CameraScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name='camera-outline'
              size={size}
              color={focused ? '#5DBEA3' : '#707070'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Root;
