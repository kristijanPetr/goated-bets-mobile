import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import dummyChartImage from './dummyChartImage.png';
import dummyBarImage from './dummyBarImage.png';
import dummyPlayerImage from './dummyPlayerImage.png';

const DATA = [
  {
    id: '1',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '2',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '3',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '4',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '5',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '6',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '7',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '8',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '9',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '10',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '11',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  },
  {
    id: '12',
    playerName: 'P. Mahomes',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  }
];

const PlayersList = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');

  const handleSelectedPlayer = (id: string) => {
    if (selectedPlayer === id) {
      return setSelectedPlayer('');
    }
    return setSelectedPlayer(id);
  };

  const renderExtraData = (item: any) => {
    return (
      <View style={styles.extraDataContainer}>
        <View style={styles.divider} />
        <Image source={dummyChartImage} style={styles.dummyImage} resizeMode="contain" />
        <View style={styles.divider} />
        <Text style={styles.extraDataHeading}> Matchup and Rankings</Text>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
            backgroundColor: variables.colors.statsGreen,
            borderRadius: 20,
            borderColor: variables.colors.white,
            borderWidth: 1,
            marginVertical: 10
          }}>
          <Text
            style={{
              color: variables.colors.black,
              fontSize: 12,
              textTransform: 'uppercase'
            }}>{`Matchup grade ${item.matchGrade}`}</Text>
        </View>

        <Image source={dummyBarImage} style={styles.dummyImage} resizeMode="contain" />

        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
            backgroundColor: variables.colors.lightGrey,
            borderRadius: 20,
            borderColor: variables.colors.white,
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 30
          }}>
          <Text
            style={{
              color: variables.colors.white,
              fontSize: 12
            }}>
            View injuries and Rankings
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = (item: any) => {
    const isSelectedPlayer = item.id === selectedPlayer;
    return (
      <TouchableOpacity
        onPress={() => handleSelectedPlayer(item.id)}
        key={item.id}
        style={styles.touchableContainer}
        activeOpacity={1}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={dummyPlayerImage} style={styles.dummyPlayerImage} resizeMode="contain" />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.textName}>{`${item.playerName} (${item.position})`}</Text>
            <Text style={styles.textStats}>{item.stats}</Text>
            <Text style={styles.textMatch}>{item.match}</Text>
          </View>
          <View style={styles.barContainer}>
            <View
              style={{
                ...styles.bar,
                backgroundColor: variables.colors.statsYellow
              }}>
              <Text style={styles.textBar}>{`${item.l5}%`}</Text>
            </View>
            <View style={{ ...styles.bar, backgroundColor: variables.colors.statsRed }}>
              <Text style={styles.textBar}> {item.streak}</Text>
            </View>
            <View style={{ ...styles.bar, backgroundColor: variables.colors.statsGreen }}>
              <Text style={styles.textBar}>{item.matchGrade}</Text>
            </View>
          </View>
          <View style={styles.oddsContainer}>
            <View style={styles.oddsBox}>
              <Text style={styles.oddsText}>{`+${item.odds}`}</Text>
            </View>
          </View>
        </View>

        {isSelectedPlayer && renderExtraData(item)}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
      {DATA.map(renderItem)}
    </ScrollView>
  );
};

export default PlayersList;

const styles = StyleSheet.create({
  scrollContainer: { marginBottom: 85, paddingHorizontal: 8 },
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
  dummyImage: {
    width: 400,
    height: 200
  },
  dummyPlayerImage: {
    width: 62,
    height: 62
  },
  divider: {
    height: 0.3,
    width: '60%',
    backgroundColor: variables.colors.activeGrey,
    marginTop: 4,
    marginBottom: 10,
    marginRight: '30%'
  },
  extraDataContainer: {
    alignItems: 'center'
  },
  extraDataHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colors.white
  }
});
