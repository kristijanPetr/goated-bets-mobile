import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';

const DATA = [
  { id: '1', homeTeam: 'BAL', awayTeam: 'KC', time: '8:20pm EST' },
  { id: '2', homeTeam: 'GB', awayTeam: 'PHI', time: '8:20pm EST' },
  { id: '3', homeTeam: 'LAC', awayTeam: 'HOU', time: '8:20pm EST' },
  { id: '4', homeTeam: 'BAL', awayTeam: 'KC', time: '8:20pm EST' },
  { id: '5', homeTeam: 'BAL', awayTeam: 'KC', time: '8:20pm EST' },
  { id: '6', homeTeam: 'BAL', awayTeam: 'KC', time: '8:20pm EST' }
];

const MatchReviewScroller = () => {
  const [selectedGames, setSelectedGames] = useState<number[]>([]);

  const handleSelectGame = (id: number) => {
    if (selectedGames.includes(id)) {
      setSelectedGames((prevState) => prevState.filter((item) => item !== id));
    } else {
      setSelectedGames((prevState) => [...prevState, id]);
    }
  };

  const renderItem = ({ item }: any) => {
    const isItemActive = selectedGames.includes(item.id);

    const textColor = isItemActive ? variables.colors.black : variables.colors.white;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleSelectGame(item.id)}
        style={{
          ...styles.item,
          backgroundColor: isItemActive ? variables.colors.activeGrey : variables.colors.grey
        }}>
        <View style={styles.itemTeamContainer}>
          <View style={styles.iconAndNameContainer}>
            <View style={styles.demoIcon}>
              <Icon icon="LClogo" style={{ width: 34, height: 34 }} />
            </View>
            <Text style={{ ...styles.teamName, color: textColor }}>{item.homeTeam}</Text>
          </View>
          <Text style={{ ...styles.teamName, color: textColor }}>Vs</Text>
          <View style={styles.iconAndNameContainer}>
            <View style={styles.demoIcon}>
              <Icon icon="bullLogo" style={{ width: 34, height: 34 }} />
            </View>
            <Text style={{ ...styles.teamName, color: textColor }}>{item.awayTeam}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={{ ...styles.time, color: textColor }}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default MatchReviewScroller;

const styles = StyleSheet.create({
  container: { marginLeft: 6, height: 76, marginBottom: 10, width: '94%' },
  item: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    width: 137,
    height: 76,
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  },
  divider: {
    backgroundColor: variables.colors.white,
    width: '100%',
    height: 0.25
  },
  itemTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80%',
    width: '90%'
  },
  teamName: {
    fontSize: 12,
    marginTop: 4
  },
  demoIcon: {
    height: 30,
    width: 30,
    borderRadius: 20
  },
  iconAndNameContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  time: {
    fontSize: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  dummyImage: {
    height: 35,
    width: 35
  }
});
