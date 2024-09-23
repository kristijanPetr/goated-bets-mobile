import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenHeader from '~/components/common/ScreenHeader';
import MatchReviewScroller from '~/components/leaderboard/MatchReviewScroller';
import StatsSelectorAndFilter from '~/components/leaderboard/StatsSelectorAndFilter';
import PlayersList from '~/components/leaderboard/PlayersList';
import PlayerListFilterLegend from '~/components/leaderboard/PlayerListFilterLegend';

const Leaderboard = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Leaderboard" />
      <MatchReviewScroller />
      <StatsSelectorAndFilter />
      <PlayerListFilterLegend />
      <PlayersList />
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({});
