import { FlatList, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import PlayerBox from './PlayerBox';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { generateL10, generateStreak } from './helper';

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
            stats: { ...stat, key: key },
            performance: {
              L10: generateL10(
                stat.price,
                stat.point,
                playerAttributes.name['='],
                performanceAttributes.hitrate['='],
                performanceAttributes.id['='],
                data.mapMarketsToAttributes[data.sport][key],
                singleton,
                {}
              ),
              streak: generateStreak(
                stat.point,
                playerAttributes.name['='],
                performanceAttributes.hitrate['='],
                performanceAttributes.id['='],
                data.mapMarketsToAttributes[data.sport][key],
                singleton,
                {}
              )
            },
            id: `${playerAttributes.name['=']}${key}${index}`
          });
        });
      });
    });
    return acc;
  }, []);

  const filterPlayerData = (playerData: PlayerData[]) => {
    let startPlayerData = [...playerData];

    if (searchFilter !== '') {
      startPlayerData = startPlayerData.filter((item: PlayerData) => {
        return item.playerInfo.name.toLowerCase().includes(searchFilter.toLowerCase());
      });
    }

    if (statsSelected.length !== 0) {
      startPlayerData = startPlayerData.filter((item: PlayerData) => {
        return statsSelected.includes(data?.mapMarketsToTitles?.[data.sport]?.[item.stats.key]);
      });
    }

    if (filterSelected !== '') {
      const sortFunction =
        filterSelected === 'playerProp'
          ? (a: PlayerData, b: PlayerData) => a.playerInfo.name.localeCompare(b.playerInfo.name)
          : filterSelected === 'L10'
            ? (a: PlayerData, b: PlayerData) => b.performance.L10 - a.performance.L10
            : filterSelected === 'streak'
              ? (a: PlayerData, b: PlayerData) => b.performance.streak - a.performance.streak
              : filterSelected === 'odds'
                ? (a: PlayerData, b: PlayerData) => b.stats.price - a.stats.price
                : () => 0;

      startPlayerData.sort(sortFunction);
    }

    return startPlayerData;
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
