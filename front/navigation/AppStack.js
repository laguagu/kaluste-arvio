import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PreviewScreen from '../screens/PreviewScreen';
import ResponseScreen from '../screens/ResponseScreen';
import PromptScreen from '../screens/PromptScreen';
import Root from './Root';
import RepairScreen from '../screens/RepairScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Root'
          component={Root}
          options={{ headerShown: false, title: 'Camera' }}
        />
        <Stack.Screen
          name='PreviewScreen'
          component={PreviewScreen}
          options={{ title: 'Preview' }}
        />
        <Stack.Screen
          name='ResponseScreen'
          component={ResponseScreen}
          options={{ title: 'Price' }}
        />
        <Stack.Screen
          name='PromptScreen'
          component={PromptScreen}
          options={{ title: 'Form' }}
        />
        <Stack.Screen
          name='RepairScreen'
          component={RepairScreen}
          options={{ title: 'Repair' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
