import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { variables } from '~/utils/mixins';
import { backgroundColor } from '@shopify/restyle';
const GamePropsDisplayStats = () => {
  const [selectedStat, setSelectedStat] = useState<string[]>(['1']);

  const handleSelectStat = (id: string) => {
    if (selectedStat.includes(id)) {
      return setSelectedStat((prevState) => prevState.filter((item) => item !== id));
    }
    return setSelectedStat((prevState) => [...prevState, id]);
  };

  const stats = [
    { id: '1', name: 'L5' },
    { id: '2', name: 'L10' },
    { id: '3', name: 'L25' },
    { id: '4', name: 'Streak' },
    { id: '5', name: 'EV' },
    { id: '6', name: 'Match Grade' }
  ];

  const renderItem = ({ item }: any) => {
    const isSelectedState = selectedStat.includes(item.id);

    const backgroundColor = isSelectedState
      ? { backgroundColor: variables.colors.activeGrey }
      : { backgroundColor: variables.colors.grey };

    const textColor = isSelectedState
      ? { color: variables.colors.black }
      : { color: variables.colors.white };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleSelectStat(item.id)}
        style={{ ...styles.statOptionContainer, ...backgroundColor }}>
        <Text style={{ ...styles.statsText, ...textColor }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <View style={styles.statTextContainer}>
          <Text style={styles.displayText}>Display</Text>
          <Text style={styles.displayText}>Stat:</Text>
        </View>
        <AntDesign name="infocirlce" size={18} color="white" />
      </View>
      <FlatList
        horizontal
        data={stats}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GamePropsDisplayStats;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row'
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  statTextContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayText: {
    fontSize: 12,
    fontWeight: '600',
    color: variables.colors.white
  },
  statOptionContainer: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,

    borderRadius: 20,
    marginRight: 4
  },
  statsText: {
    fontSize: 12
  }
});
