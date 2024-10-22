import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from '../icon/icon';

const GoatedBets = () => {
  return (
    <View style={styles.container}>
      <Icon icon={'goatedLogo'} />
      <Icon icon={'goatedText'} style={{ position: 'absolute', top: -60, left: -120 }} />
      <Icon icon={'betsText'} style={{ position: 'absolute', top: -20, left: -20 }} />
    </View>
  );
};

export default GoatedBets;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
