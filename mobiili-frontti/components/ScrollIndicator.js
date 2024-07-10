import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// This component displays a scroll indicator at the bottom of the screen.
const ScrollIndicator = ({ isVisible }) => {
  return isVisible ? (
    <View style={styles.indicator}>
      <Icon name='chevron-double-down' size={24} color='#5DBEA3' />
      {/* <Text style={styles.indicatorText}>Scroll for more</Text> */}
    </View>
  ) : null;
};

export default ScrollIndicator;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: -30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  indicatorText: {
    fontSize: 8,
  },
});
