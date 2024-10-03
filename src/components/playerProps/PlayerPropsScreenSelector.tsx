import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import SlidingSelector from '../common/SlidingSelector';
import GamePropsSection from './GamePropsSection';
import PlayerPropsSection from './PlayerPropsSection';
import InjuriesRankingsSection from './InjuriesRankingsSection';

const PlayerPropsScreenSelector = () => {
  const options = ['Game Props', 'Player Props', 'Injuries/Rankings'];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleSelection = (index: number) => {
    setSelectedIndex(index);
  };
  const renderScreen = () => {
    switch (selectedIndex) {
      case 0:
        return <GamePropsSection />;
      case 1:
        return <PlayerPropsSection />;
      case 2:
        return <InjuriesRankingsSection />;
      default:
        return <GamePropsSection />;
    }
  };

  return (
    <View style={styles.container}>
      <SlidingSelector
        options={options}
        selectedIndex={selectedIndex}
        handleSelection={handleSelection}
      />
      {renderScreen()}
    </View>
  );
};

export default PlayerPropsScreenSelector;

const styles = StyleSheet.create({
  container: {}
});
