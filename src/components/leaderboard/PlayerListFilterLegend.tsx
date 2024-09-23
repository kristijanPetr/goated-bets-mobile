import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import AntDesign from '@expo/vector-icons/AntDesign';

const PlayerListFilterLegend = () => {
  const [filterSelected, setSelectedFilter] = useState<{
    playerProp: boolean;
    ls: boolean;
    streak: boolean;
    matchGrade: boolean;
    odds: boolean;
  }>({
    playerProp: false,
    ls: false,
    streak: false,
    matchGrade: false,
    odds: false
  });

  return (
    <View style={styles.container}>
      <View style={styles.playerPropContainer}>
        <Text style={styles.textLegend}>Player/Prop</Text>
        <AntDesign
          name={filterSelected.playerProp ? 'caretup' : 'caretdown'}
          size={12}
          color="white"
        />
      </View>
      <View style={styles.barFilterContainer}>
        <View>
          <Text style={styles.textLegend}>LS</Text>
          <AntDesign name={filterSelected.ls ? 'caretup' : 'caretdown'} size={12} color="white" />
        </View>
        <View>
          <Text style={styles.textLegend}>Streak</Text>
          <AntDesign
            name={filterSelected.streak ? 'caretup' : 'caretdown'}
            size={12}
            color="white"
          />
        </View>
        <View>
          <Text style={styles.textLegend}>Match</Text>
          <Text style={styles.textLegend}>Grade</Text>
          <AntDesign
            name={filterSelected.matchGrade ? 'caretup' : 'caretdown'}
            size={12}
            color="white"
          />
        </View>
      </View>
      <View style={styles.oddsFilterContainer}>
        <Text style={styles.textLegend}>Odds</Text>
        <AntDesign name={filterSelected.odds ? 'caretup' : 'caretdown'} size={12} color="white" />
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
