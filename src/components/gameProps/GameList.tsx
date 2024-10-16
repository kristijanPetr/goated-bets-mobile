import { FlatList, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import GameData from './GameData';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

interface Props {
  selectedStat: string;
}

const GameList = ({ selectedStat }: Props) => {
  const { data } = useContext(SingletonDataContextProvider);
  const [selectedGame, setSelectedGame] = useState('');

  const handleSelectedGame = (id: string) => {
    if (selectedGame === id) {
      return setSelectedGame('');
    }
    return setSelectedGame(id);
  };

  return (
    <FlatList
      data={data.tickers}
      renderItem={({ item }: any) => (
        <GameData
          item={item}
          handleSelectedGame={handleSelectedGame}
          selectedGame={selectedGame}
          selectedStat={selectedStat}
        />
      )}
      keyExtractor={(item, index) => `${item.awayName}-${item.homeName}-${index}`}
      windowSize={6}
      style={styles.container}
      extraData={selectedGame}
    />
  );
};

export default GameList;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 6, marginTop: 16, marginBottom: 90 }
});
