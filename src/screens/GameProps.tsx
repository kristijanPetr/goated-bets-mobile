import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenHeader from '~/components/common/ScreenHeader';
import GamePropsDisplayStats from '~/components/gameProps/GamePropsDisplayStats';
import GameList from '~/components/gameProps/GameList';
import FloatingBettingMenu from '~/components/floatingBettingMenu/FloatingBettingMenu';

const GameProps = () => {
  const [selectedStat, setSelectedStat] = useState<string>('L5');

  return (
    <LinearGradient
      colors={[variables.colors.backgroundLinearDark, variables.colors.backgroundLinearBright]}
      start={{ x: 0.8, y: 0.8 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}>
      <View style={styles.container}>
        <ScreenHeader title="Game props" />
        <GamePropsDisplayStats selectedStat={selectedStat} setSelectedStat={setSelectedStat} />
        <GameList selectedStat={selectedStat} />
        <FloatingBettingMenu />
      </View>
    </LinearGradient>
  );
};

export default GameProps;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  }
});
