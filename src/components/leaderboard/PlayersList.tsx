import { FlatList, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import PlayerBox from './PlayerBox';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { filterPlayerData, generateL10, generateStreak, getPlayerData } from './helper';

interface Props {
  statsSelected: string[];
  searchFilter: string;
  filterSelected: string;
}

export type PlayerData = {
  playerInfo: {
    name: string;
    avatar: string;
    position: string;
  };
  performance: { L10: any; streak: any };
  matchup: string;
  stats: any;
  id: string;
};

const PlayersList = ({ statsSelected, searchFilter, filterSelected }: Props) => {
  const { data, selectedGames, singleton } = useContext(SingletonDataContextProvider);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const playerGamesSelected = !selectedGames ? data?.tickers : [selectedGames];

  const playerData = playerGamesSelected?.reduce((acc: PlayerData[], ticker: any) => {
    return [...acc, ...getPlayerData(ticker, data, singleton)];
  }, []);

  const handleSelectedPlayer = (id: string) => {
    if (selectedPlayer === id) {
      return setSelectedPlayer('');
    }
    return setSelectedPlayer(id);
  };

  return (
    <FlatList
      data={filterPlayerData(playerData, searchFilter, statsSelected, filterSelected, data)}
      renderItem={({ item }) => (
        <PlayerBox
          item={item}
          handleSelectedPlayer={handleSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />
      )}
      keyExtractor={(item: any) => item.id}
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
