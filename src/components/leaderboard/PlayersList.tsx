import { FlatList, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import PlayerBox from './PlayerBox';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

interface Props {
  statsSelected: string[];
  searchFilter: string;
}

export type PlayerData = {
  playerInfo: {
    name: string;
    avatar: string;
    position: string;
  };
  performance: { hitrate: string; id: string };
  matchup: string;
  stats: any;
  id: string;
};

const PlayersList = ({ statsSelected, searchFilter }: Props) => {
  const { data, selectedGames } = useContext(SingletonDataContextProvider);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const playerGamesSelected = !selectedGames ? data?.tickers : [selectedGames];
  const playerData = playerGamesSelected?.reduce((acc: PlayerData[], ticker: any) => {
    ticker.lineups.forEach((lineup: any) => {
      const playerAttributes = lineup.player.attributes;
      const performanceAttributes = lineup.performance.attributes;
      const matchup = `${ticker.awayName} @ ${ticker.homeName}`;
      Object.entries(lineup.propositions).forEach(([key, proposition]: [string, any]) => {
        const statsArray = Object.values(proposition.raw);

        statsArray.forEach((stat: any, index: number) => {
          acc.push({
            playerInfo: {
              name: playerAttributes.name['='],
              avatar: playerAttributes.avatar['='],
              position: playerAttributes.position['=']
            },
            matchup,
            stats: { ...stat, key: data.mapMarketsToAttributes[data.sport][key] },
            performance: {
              hitrate: performanceAttributes.hitrate['='],
              id: performanceAttributes.id['=']
            },
            id: `${playerAttributes.name['=']}${key}${index}`
          });
        });
      });
    });
    return acc;
  }, []);

  const filterPlayerData = (playerData: PlayerData[]) => {
    if (searchFilter !== '') {
      return playerData.filter((item: PlayerData) => {
        return item.playerInfo.name.toLowerCase().includes(searchFilter.toLowerCase());
      });
    }

    if (statsSelected.length !== 0) {
      return playerData.filter((item: PlayerData) => {
        return statsSelected.includes(data?.mapMarketsToTitles?.[data.sport]?.[item.stats.key]);
      });
    }

    return playerData;
  };

  const handleSelectedPlayer = (id: string) => {
    if (selectedPlayer === id) {
      return setSelectedPlayer('');
    }
    return setSelectedPlayer(id);
  };

  return (
    <FlatList
      data={filterPlayerData(playerData)}
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
