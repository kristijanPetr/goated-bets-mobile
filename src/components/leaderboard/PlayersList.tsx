import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { variables } from '~/utils/mixins';

const DATA = [
  {
    id: '1',
    playerName: 'P. Bojan',
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
    playerName: 'P. Bojan',
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
    playerName: 'P. Bojan',
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
    playerName: 'P. Bojan',
    position: 'QB',
    stats: 'Over 250 Passing Yds',
    match: 'Raven @ Chiefs',
    l5: 40,
    streak: 1,
    matchGrade: 'B',
    odds: 400
  }
];

// Combine data only once
const combinedData = [...DATA, ...DATA, ...DATA];

const PlayersList = () => {
  const renderItem = (item: any) => {
    return (
      <View key={item.id} style={styles.container}>
        <View style={styles.imageContainer}></View>
        <View style={styles.nameContainer}>
          <Text style={styles.textName}>{item.playerName}</Text>
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
            <Text style={styles.oddsText}>{item.odds}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
      {combinedData.map(renderItem)}
    </ScrollView>
  );
};

export default PlayersList;

const styles = StyleSheet.create({
  scrollContainer: { marginBottom: 60, paddingHorizontal: 8 },
  container: {
    height: 60,
    backgroundColor: variables.colors.grey,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    backgroundColor: variables.colors.black,
    borderRadius: 20,
    height: 58,
    width: '15%'
  },
  nameContainer: {
    width: '33%',
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
    backgroundColor: variables.colors.statsGrey,
    borderWidth: 1,
    borderColor: variables.colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  oddsText: {
    color: variables.colors.white,
    fontSize: 12
  }
});
