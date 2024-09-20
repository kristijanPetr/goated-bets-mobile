import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { variables } from '~/utils/mixins';

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
        onPress={() => handleSelectGame(item.id)}
        style={{
          ...styles.item,
          backgroundColor: isItemActive ? variables.colors.lightGrey : variables.colors.grey
        }}>
        <View style={styles.itemTeamContainer}>
          <View style={styles.iconAndNameContainer}>
            <View style={styles.demoIcon}></View>
            <Text style={{ ...styles.teamName, color: textColor }}>{item.homeTeam}</Text>
          </View>
          <Text style={{ ...styles.teamName, color: textColor }}>Vs</Text>
          <View style={styles.iconAndNameContainer}>
            <View style={styles.demoIcon}></View>
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
      style={{ marginLeft: 6 }}
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
  item: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    width: 137,
    height: 76,
    alignItems: 'center',
    marginBottom: 16
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
    fontSize: 12
  },
  demoIcon: {
    backgroundColor: variables.colors.black,
    opacity: 0.3,
    height: 26,
    width: 26,
    borderRadius: 20,
    marginBottom: 5
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
  }
});
