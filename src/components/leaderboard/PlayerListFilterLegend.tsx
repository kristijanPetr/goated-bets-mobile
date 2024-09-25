import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import PlayerFilterOptionsButton from './PlayerFilterOptionsButton';

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
        <PlayerFilterOptionsButton
          label="Player/Prop"
          value={filterSelected.playerProp}
          onChange={() =>
            setSelectedFilter({ ...filterSelected, playerProp: !filterSelected.playerProp })
          }
        />
      </View>
      <View style={styles.barFilterContainer}>
        <PlayerFilterOptionsButton
          label="l5"
          value={filterSelected.l5}
          onChange={() => setSelectedFilter({ ...filterSelected, l5: !filterSelected.l5 })}
        />
        <PlayerFilterOptionsButton
          label="Streak"
          value={filterSelected.streak}
          onChange={() => setSelectedFilter({ ...filterSelected, streak: !filterSelected.streak })}
        />
        <PlayerFilterOptionsButton
          label={`Match \nGrade`}
          value={filterSelected.matchGrade}
          onChange={() =>
            setSelectedFilter({ ...filterSelected, matchGrade: !filterSelected.matchGrade })
          }
        />
      </View>
      <View style={styles.oddsFilterContainer}>
        <PlayerFilterOptionsButton
          label="Odds"
          value={filterSelected.odds}
          onChange={() => setSelectedFilter({ ...filterSelected, odds: !filterSelected.odds })}
        />
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
  }
});
