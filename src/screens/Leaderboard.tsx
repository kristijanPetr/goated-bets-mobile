import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import ScreenHeader from '~/components/common/ScreenHeader';
import MatchReviewScroller from '~/components/leaderboard/MatchReviewScroller';
import StatsSelectorAndFilter from '~/components/leaderboard/StatsSelectorAndFilter';
import PlayersList from '~/components/leaderboard/PlayersList';
import PlayerListFilterLegend from '~/components/leaderboard/PlayerListFilterLegend';
import { variables } from '~/utils/mixins';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingBettingMenu from '~/components/floatingBettingMenu/FloatingBettingMenu';

const Leaderboard = () => {
  const [filterSelected, setSelectedFilter] = useState<string>('');
  const [statsSelected, setStatsSelected] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const handleStatSelect = (selectOption: string) => {
    if (statsSelected.includes(selectOption)) {
      setStatsSelected((prevState) => prevState.filter((item) => item !== selectOption));
    } else {
      setStatsSelected((prevState) => [...prevState, selectOption]);
    }
  };

  return (
    <LinearGradient
      colors={[variables.colors.backgroundLinearDark, variables.colors.backgroundLinearBright]}
      start={{ x: 0.8, y: 0.8 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}>
      <View style={styles.container}>
        <ScreenHeader title="Leaderboard" />
        <MatchReviewScroller />
        <StatsSelectorAndFilter
          statsSelected={statsSelected}
          searchFilter={searchFilter}
          handleStatSelect={handleStatSelect}
          setSearchFilter={setSearchFilter}
        />
        <PlayerListFilterLegend
          filterSelected={filterSelected}
          setSelectedFilter={setSelectedFilter}
        />
        <PlayersList
          statsSelected={statsSelected}
          searchFilter={searchFilter}
          filterSelected={filterSelected}
        />
        <FloatingBettingMenu />
      </View>
    </LinearGradient>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  }
});
