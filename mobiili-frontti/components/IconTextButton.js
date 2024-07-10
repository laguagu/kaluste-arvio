import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';
import { useFonts, Nunito_700Bold } from '@expo-google-fonts/nunito';

const IconTextButton = ({
  onPress,
  icon,
  title,
  backgroundColor,
  textColor,
  iconColor,
}) => {
  // Load the Nunito_700Bold font.
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 12 }}>
      <Icon.Button
        name={icon}
        iconStyle={{ color: iconColor }}
        backgroundColor={backgroundColor}
        onPress={onPress}
        style={{ padding: 12 }}
      >
        <Text
          style={{
            fontSize: 14,
            color: textColor,
            fontFamily: 'Nunito_700Bold',
          }}
        >
          {title}
        </Text>
      </Icon.Button>
    </View>
  );
};

export default IconTextButton;
