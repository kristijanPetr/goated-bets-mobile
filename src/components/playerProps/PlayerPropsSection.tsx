import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GamePropsDisplayStats from '../gameProps/GamePropsDisplayStats';

const PlayerPropsSection = () => {
  return (
    <View style={styles.container}>
      <GamePropsDisplayStats />
    </View>
  );
};

export default PlayerPropsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }
});
