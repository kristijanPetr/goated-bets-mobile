import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { variables } from '~/utils/mixins';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenHeader from '~/components/common/ScreenHeader';
import MatchReviewScroller from '~/components/leaderboard/MatchReviewScroller';
import PlayerPropsScreenSelector from '~/components/playerProps/PlayerPropsScreenSelector';
import FloatingBettingMenu from '~/components/floatingBettingMenu/FloatingBettingMenu';

const PlayerProps = () => {
  return (
    <LinearGradient
      colors={[variables.colors.backgroundLinearDark, variables.colors.backgroundLinearBright]}
      start={{ x: 0.8, y: 0.8 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}>
      <View>
        <ScreenHeader title="Player props" />
        <MatchReviewScroller />
        <PlayerPropsScreenSelector />
      </View>
      <FloatingBettingMenu />
    </LinearGradient>
  );
};

export default PlayerProps;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  }
});
