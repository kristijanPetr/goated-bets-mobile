import { StyleSheet, View } from 'react-native';
import React from 'react';
import PlayerFilterOptionsButton from './PlayerFilterOptionsButton';

interface Props {
  filterSelected: string;
  setSelectedFilter: (selectOption: string) => void;
}

const PlayerListFilterLegend = ({ filterSelected, setSelectedFilter }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.playerPropContainer}>
        <PlayerFilterOptionsButton
          label="Player/Prop"
          value={filterSelected === 'playerProp'}
          onChange={() => setSelectedFilter('playerProp')}
        />
      </View>
      <View style={styles.barFilterContainer}>
        <PlayerFilterOptionsButton
          label="L5"
          value={filterSelected === 'l5'}
          onChange={() => setSelectedFilter('l5')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="L10"
          value={filterSelected === 'l10'}
          onChange={() => setSelectedFilter('l10')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="Season"
          value={filterSelected === 'season'}
          onChange={() => setSelectedFilter('season')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="H2H"
          value={filterSelected === 'h2h'}
          onChange={() => setSelectedFilter('h2h')}
          containerStyle={{ width: '20%' }}
        />
        <PlayerFilterOptionsButton
          label="Streak"
          value={filterSelected === 'streak'}
          onChange={() => setSelectedFilter('streak')}
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
          value={filterSelected === 'odds'}
          onChange={() => setSelectedFilter('odds')}
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
