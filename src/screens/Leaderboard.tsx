import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenHeader from '~/components/common/ScreenHeader';
import MatchReviewScroller from '~/components/leaderboard/MatchReviewScroller';
import StatsSelectorAndFilter from '~/components/leaderboard/StatsSelectorAndFilter';

// individual player stats box height of 54 , colors are in the mixin
const Leaderboard = () => {
  return (
    <View>
      <ScreenHeader title="Leaderboard" />
      <MatchReviewScroller />
      <StatsSelectorAndFilter />
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({});
