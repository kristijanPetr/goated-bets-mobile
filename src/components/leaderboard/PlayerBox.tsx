import React, { useContext, useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { variables } from '~/utils/mixins';
import PlayerExtraData from './PlayerExtraData';
import { PlayerData } from './PlayersList';

interface Props {
  item: PlayerData;
  selectedPlayer: string;
  handleSelectedPlayer: (id: string) => void;
}

const PlayerBox = ({ item, selectedPlayer, handleSelectedPlayer }: Props) => {
  const { data, singleton, toolkit, selectedGames } = useContext(SingletonDataContextProvider);
  const isSelectedPlayer = item.id === selectedPlayer;

  const getStatTitle = (key: string) => {
    return data?.mapMarketsToTitles?.[data?.sport]?.[key] || '';
  };

  const calculateMatchGrade = useMemo(() => {
    const player = selectedGames.lineups?.find(
      (pl: any) => pl.player.attributes.name['='] === item.playerInfo.name
    );
    if (!player) {
      return 0;
    }
    const playerStats = singleton.ms_generate_stats_for_player(toolkit, selectedGames, player);

    const weights = {
      hits: 2,
      home_runs: 4,
      rbis: 3,
      strikeouts: -1
    };

    // Extract the relevant stats
    const hits = playerStats.seasonStatsRaw['batter_hits'] || 0;
    const homeRuns = playerStats.seasonStatsRaw['batter_home_runs'] || 0;
    const rbis = playerStats.seasonStatsRaw['batter_rbis'] || 0;
    const strikeouts = playerStats.seasonStatsRaw['batter_strikeouts'] || 0;

    // Calculate the match grade using a weighted sum of stats
    const matchGrade =
      hits * weights.hits +
      homeRuns * weights.home_runs +
      rbis * weights.rbis +
      strikeouts * weights.strikeouts;

    return matchGrade;
  }, [item, selectedGames, singleton]);

  return (
    <TouchableOpacity
      onPress={() => handleSelectedPlayer(item.id)}
      key={item.id}
      style={styles.touchableContainer}
      activeOpacity={1}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {item.playerInfo.avatar && (
            <Image
              source={{ uri: item.playerInfo.avatar }}
              style={styles.dummyPlayerImage}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={styles.textName}>{`${item.playerInfo.name} (${item.playerInfo.position})`}</Text>
          <Text
            style={
              styles.textStats
            }>{`${getStatTitle(item.stats.key)} ${item.stats.name} ${item.stats.point}`}</Text>
          <Text style={styles.textMatch}>{item.matchup}</Text>
        </View>
        <View style={styles.barContainer}>
          <View
            style={{
              ...styles.bar,
              backgroundColor: variables.colorHeatMap(item.performance.L5, 'l5')
            }}>
            <Text style={styles.textBar}>{item.performance.L5}</Text>
          </View>
          <View
            style={{
              ...styles.bar,
              backgroundColor: variables.colorHeatMap(item.performance.L10, 'l10')
            }}>
            <Text style={styles.textBar}>{item.performance.L10}</Text>
          </View>
          <View
            style={{
              ...styles.bar,
              backgroundColor: variables.colorHeatMap(item.performance.streak, 'hitrate')
            }}>
            <Text style={styles.textBar}> {item.performance.streak}</Text>
          </View>
          {/* <View style={{ ...styles.bar, backgroundColor: variables.colors.statsGreen }}>
            <Text style={styles.textBar}>{calculateMatchGrade}</Text>
          </View> */}
        </View>
        <View style={styles.oddsContainer}>
          <View style={styles.oddsBox}>
            <Text style={styles.oddsText}>
              {item.stats.price > 0 ? '+' : ''}
              {item.stats.price}
            </Text>
          </View>
        </View>
      </View>

      {isSelectedPlayer && <PlayerExtraData item={item} />}
    </TouchableOpacity>
  );
};

export default PlayerBox;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center'
  },
  touchableContainer: {
    marginBottom: 10,
    backgroundColor: variables.colors.grey
  },
  imageContainer: {
    height: 60,
    width: '12%'
  },
  nameContainer: {
    width: '36%',
    marginLeft: '2%'
  },
  textName: {
    fontSize: 10,
    color: variables.colors.white
  },
  textStats: {
    fontSize: 12,
    fontWeight: 'bold',
    color: variables.colors.white
  },
  textMatch: {
    fontSize: 8,
    color: variables.colors.white
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '30%'
  },
  bar: {
    height: 25,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBar: {
    fontSize: 10
  },
  oddsContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  oddsBox: {
    height: 35,
    width: 60,
    backgroundColor: variables.colors.lightGrey,
    borderWidth: 1,
    borderColor: variables.colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  oddsText: {
    color: variables.colors.white,
    fontSize: 12
  },

  dummyPlayerImage: {
    width: 62,
    height: 62
  }
});
