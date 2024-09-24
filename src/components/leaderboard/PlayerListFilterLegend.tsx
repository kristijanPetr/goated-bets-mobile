import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import AntDesign from '@expo/vector-icons/AntDesign';

const PlayerListFilterLegend = () => {
  const [filterSelected, setSelectedFilter] = useState<{
    playerProp: boolean;
    l5: boolean;
    streak: boolean;
    matchGrade: boolean;
    odds: boolean;
  }>({
    playerProp: false,
    l5: false,
    streak: false,
    matchGrade: false,
    odds: false
  });

  return (
    <View style={styles.container}>
      <View style={styles.playerPropContainer}>
        <TouchableOpacity
          onPress={() =>
            setSelectedFilter({ ...filterSelected, playerProp: !filterSelected.playerProp })
          }
          style={{ alignItems: 'center' }}
          activeOpacity={0.8}>
          <Text style={styles.textLegend}>Player/Prop</Text>
          <AntDesign
            name={filterSelected.playerProp ? 'caretup' : 'caretdown'}
            size={12}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.barFilterContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: 'center' }}
          onPress={() => setSelectedFilter({ ...filterSelected, l5: !filterSelected.l5 })}>
          <Text style={styles.textLegend}>L5</Text>
          <AntDesign name={filterSelected.l5 ? 'caretup' : 'caretdown'} size={12} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: 'center' }}
          onPress={() => setSelectedFilter({ ...filterSelected, streak: !filterSelected.streak })}>
          <Text style={styles.textLegend}>Streak</Text>
          <AntDesign
            name={filterSelected.streak ? 'caretup' : 'caretdown'}
            size={12}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: 'center' }}
          onPress={() =>
            setSelectedFilter({ ...filterSelected, matchGrade: !filterSelected.matchGrade })
          }>
          <Text style={styles.textLegend}>Match</Text>
          <Text style={styles.textLegend}>Grade</Text>
          <AntDesign
            name={filterSelected.matchGrade ? 'caretup' : 'caretdown'}
            size={12}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.oddsFilterContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: 'center' }}
          onPress={() => setSelectedFilter({ ...filterSelected, odds: !filterSelected.odds })}>
          <Text style={styles.textLegend}>Odds</Text>
          <AntDesign name={filterSelected.odds ? 'caretup' : 'caretdown'} size={12} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerListFilterLegend;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  playerPropContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
  },
  barFilterContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '30%',
    flexDirection: 'row'
  },
  oddsFilterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  textLegend: {
    fontSize: 12,
    color: variables.colors.white
  }
});
