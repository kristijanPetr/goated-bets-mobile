import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';

import dummyGameChart from './dummyGameChart.png';

const GameExtraData = () => {
  const [selectedStat, setSelectedStat] = useState<string[]>(['']);

  const handleSelectStats = (id: string) => {
    if (selectedStat.includes(id)) {
      return setSelectedStat((prevState) => prevState.filter((stat) => stat !== id));
    }
    return setSelectedStat((prevState) => [...prevState, id]);
  };

  const statsOptions = ['Spread', 'Moneyline', 'Total Over', 'Total Under'];
  return (
    <View style={styles.container}>
      <View style={styles.statsSelectContainer}>
        {statsOptions.map((item) => {
          const isSelectedStat = selectedStat.includes(item);

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleSelectStats(item)}
              style={{
                ...styles.statsContainer,
                backgroundColor: isSelectedStat
                  ? variables.colors.activeGrey
                  : variables.colors.lightGrey
              }}>
              <Text
                style={{
                  ...styles.statText,
                  color: isSelectedStat ? variables.colors.black : variables.colors.white
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.headingText}>Last 5 Games</Text>
      <View style={styles.imageContainer}>
        <Image source={dummyGameChart} style={styles.dummyGameImage} resizeMode="contain" />
      </View>
    </View>
  );
};

export default GameExtraData;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsSelectContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  statsContainer: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statText: {
    fontSize: 12
  },
  headingText: {
    fontSize: 14,
    fontWeight: '600',
    color: variables.colors.white
  },
  imageContainer: {
    height: 200,
    width: '100%',
    marginBottom: 10
  },
  dummyGameImage: {
    width: 400,
    height: 200
  }
});
