import { FlatList, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import PlayerBox from './PlayerBox';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { filterPlayerData, getPlayerData } from './helper';

interface Props {
  statsSelected: string[];
  searchFilter: string;
  filterSelected: { id: string; type: string };
}

export type PlayerData = {
  playerInfo: {
    name: string;
    avatar: string;
    position: string;
  };
  performance: { L10: any; L5: any; streak: any; season: any; h2h: any };
  matchup: string;
  stats: any;
  id: string;
};

const PlayersList = ({ statsSelected, searchFilter, filterSelected }: Props) => {
  const { data, singleton } = useContext(SingletonDataContextProvider);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const playerGamesSelected = data?.ticker || {};
  console.log(data, 'see data');
  const playerData = getPlayerData(playerGamesSelected, singleton);

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
