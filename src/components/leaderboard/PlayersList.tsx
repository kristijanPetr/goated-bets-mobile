import { FlatList, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import PlayerBox from './PlayerBox';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

const PlayersList = () => {
  const { data, selectedGames } = useContext(SingletonDataContextProvider);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const playerGamesSelected =
    selectedGames.length === 0
      ? data?.tickers
      : data?.tickers.filter((item: any) =>
          selectedGames.includes(`${item.awayName}${item.homeName}`)
        );
  const playerData = playerGamesSelected
    ?.map((ticker: any) =>
      ticker.lineups.map((item: any) => {
        return { ...item, matchup: `${ticker.awayName} @ ${ticker.homeName}` };
      })
    )
    .flat();

  const handleSelectedPlayer = (id: string) => {
    if (selectedPlayer === id) {
      return setSelectedPlayer('');
    }
    return setSelectedPlayer(id);
  };

  return (
    <FlatList
      data={playerData}
      renderItem={({ item, index }) => (
        <PlayerBox
          item={item}
          index={index}
          handleSelectedPlayer={handleSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />
      )}
      keyExtractor={(item: any, index: number) => `${item.playerPosition}${index}`}
      showsHorizontalScrollIndicator={false}
      windowSize={6}
      style={styles.scrollContainer}
      extraData={selectedPlayer}
    />
  );
};

export default PlayersList;

const styles = StyleSheet.create({
  scrollContainer: { marginBottom: 85, paddingHorizontal: 8, height: '60%' }
});
