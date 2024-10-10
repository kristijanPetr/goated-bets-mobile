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
  const playerGamesSelected =
    selectedGames.length === 0
      ? data?.tickers
      : data?.tickers.filter((item: any) =>
          selectedGames.includes(`${item.awayName}${item.homeName}`)
        );
  const playerData = playerGamesSelected
    ?.map((ticker: any) =>
      ticker.lineups.map((item: any, index: number) => {
        let playerData: PlayerData[] = [];
        Object.keys(item.propositions).map((key: string) => {
          const statsArray = Object.values(item.propositions[key].raw);
          if (statsArray.length > 0) {
            statsArray.forEach((stat: any, index: number) => {
              playerData.push({
                playerInfo: {
                  name: item.player.attributes.name['='],
                  avatar: item.player.attributes.avatar['='],
                  position: item.player.attributes.position['=']
                },
                matchup: `${ticker.awayName} @ ${ticker.homeName}`,
                stats: { ...stat, key: key },
                performance: {
                  hitrate: item.performance.attributes.hitrate['='],
                  id: item.performance.attributes.id['=']
                },
                id: `${item.player.attributes.name['=']}${key}${index}`
              });
            });
          }
        });

        return playerData;
      })
    )
    .flat(2);

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
