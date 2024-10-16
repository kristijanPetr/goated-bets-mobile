import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import GamePropsDisplayStats from '../gameProps/GamePropsDisplayStats';

const PlayerPropsSection = () => {
  const [selectedStat, setSelectedStat] = useState<string>('L5');

  return (
    <View style={styles.container}>
      <GamePropsDisplayStats selectedStat={selectedStat} setSelectedStat={setSelectedStat} />
    </View>
  );
};

export default PlayerPropsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  }
});
