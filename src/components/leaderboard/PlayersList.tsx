import { FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import PlayerBox from './PlayerBox';

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

  return (
    <FlatList
      data={DATA}
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
