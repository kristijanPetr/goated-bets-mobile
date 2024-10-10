import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Meta {
  [key: string]: number | string;
  away_season_wins_total: number;
  away_season_losses_total: number;
  home_season_wins_total: number;
  home_season_losses_total: number;
}

interface Props {
  meta: Meta | null;
  rankSide: 'home' | 'away';
  mapGamelinesToTitles: { [key: string]: string };
}

const OffDefSection: React.FC<Props> = ({ meta, rankSide = 'away', mapGamelinesToTitles }) => {
  if (!meta) {
    return null;
  }

  const getRankText = (
    seasonWins: number,
    seasonLosses: number,
    seasonPointsKey: string
  ): string => {
    return seasonWins + seasonLosses > 0
      ? `${meta[seasonPointsKey + '_rank']} (${((meta[seasonPointsKey] as number) / (seasonWins + seasonLosses)).toFixed(2)})`
      : 'N/A';
  };

  const awayPointsKey = `away_season_points${rankSide === 'away' ? '_for' : '_against'}`;
  const homePointsKey = `home_season_points${rankSide === 'home' ? '_for' : '_against'}`;

  const getColor = (wins: number, losses: number): string => {
    return (wins + losses) / losses >= 0.5 ? 'rgba(42,253,64,1)' : 'rgba(252,27,36,1)';
  };

  return (
    <View
      style={{
        height: 80,
        flexDirection: 'row'
      }}>
      <Text style={{ color: getColor(meta.away_season_wins_total, meta.away_season_losses_total) }}>
        {getRankText(meta.away_season_wins_total, meta.away_season_losses_total, awayPointsKey)}
      </Text>
      <Text style={{ color: 'white' }}>{mapGamelinesToTitles['total_over']}</Text>
      <Text style={{ color: getColor(meta.home_season_wins_total, meta.home_season_losses_total) }}>
        {getRankText(meta.home_season_wins_total, meta.home_season_losses_total, homePointsKey)}
      </Text>
    </View>
  );
};

export default OffDefSection;
