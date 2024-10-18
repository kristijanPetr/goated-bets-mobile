import { StyleSheet, View } from 'react-native';
import React from 'react';
import PlayerFilterOptionsButton from './PlayerFilterOptionsButton';

interface Props {
  filterSelected: { id: string; type: string };
  setSelectedFilter: (selectOption: { id: string; type: string }) => void;
}

const PlayerListFilterLegend = ({ filterSelected, setSelectedFilter }: Props) => {
  const handleSelectFilterType = (id: string) => {
    if (filterSelected.id !== id) {
      return setSelectedFilter({ id, type: 'asc' });
    } else {
      if (filterSelected.type === 'asc') {
        return setSelectedFilter({ id, type: 'desc' });
      }
      if (filterSelected.type === 'desc') {
        return setSelectedFilter({ id: '', type: '' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.playerPropContainer}>
        <PlayerFilterOptionsButton
          label="Player/Prop"
          value={filterSelected}
          type="playerProp"
          onChange={() => handleSelectFilterType('playerProp')}
        />
      </View>
      <View style={styles.barFilterContainer}>
        <PlayerFilterOptionsButton
          label="L5"
          value={filterSelected}
          type="l5"
          onChange={() => handleSelectFilterType('l5')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="L10"
          value={filterSelected}
          type="l10"
          onChange={() => handleSelectFilterType('l10')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="Season"
          value={filterSelected}
          type="season"
          onChange={() => handleSelectFilterType('season')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="H2H"
          value={filterSelected}
          type="h2h"
          onChange={() => handleSelectFilterType('h2h')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="Streak"
          value={filterSelected}
          type="streak"
          onChange={() => handleSelectFilterType('streak')}
          containerStyle={{ width: '20%' }}
        />
        {/* <PlayerFilterOptionsButton
          label={`Match \nGrade`}
          value={filterSelected === 'matchGrade'}
          onChange={() => setSelectedFilter('matchGrade')}
          containerStyle={{ width: '33%' }}
        /> */}
      </View>
      <View style={styles.oddsFilterContainer}>
        <PlayerFilterOptionsButton
          label="Odds"
          value={filterSelected}
          type="odds"
          onChange={() => handleSelectFilterType('odds')}
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
    width: '43%'
  },
  barFilterContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '45%',
    flexDirection: 'row'
  },
  oddsFilterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%'
  }
});
