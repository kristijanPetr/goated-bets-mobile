import React from 'react';
import { View, Text, Image } from 'react-native';

interface MatchupAttributes {
  home_score: { '=': string };
  away_score: { '=': string };
  home: { '=': string };
  away: { '=': string };
  id: { '=': string };
  logo?: { '=': string };
}

interface Team {
  attributes: MatchupAttributes;
}

interface Matchup {
  attributes: {
    home: { '=': string };
    id: { '=': string };
  };
}

interface Props {
  singleton: {
    teamsX: {
      [key: string]: Team;
    };
  };
  ticker: {
    matchup: Matchup;
  };
}

const MatchupList: React.FC<Props> = ({ singleton, ticker }) => {
  const homeTeamId = ticker.matchup.attributes.home['='];

  return (
    <View>
      <Text style={{ color: 'white' }}>
        <Image source={{ uri: '/static/images/pixel.png' }} style={{ width: 20, height: 20 }} />
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Score</Text>
        </Text>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Spread</Text>
        </Text>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Total</Text>
        </Text>
      </Text>

      {singleton?.teamsX[homeTeamId]?.lists['membersdb.matchups'].items.map(
        (i2v: Team, index: number) => {
          const isHomeTeam = ticker.matchup.attributes.home['='] === i2v.attributes.home['='];
          const opponentId = isHomeTeam ? i2v.attributes.away['='] : i2v.attributes.home['='];

          if (i2v.attributes.id['='] === ticker.matchup.attributes.id['=']) {
            return null;
          }

          const homeScore = parseInt(i2v.attributes.home_score['='], 10);
          const awayScore = parseInt(i2v.attributes.away_score['='], 10);

          const winOrLoss = isHomeTeam
            ? homeScore > awayScore
              ? 'W'
              : 'L'
            : homeScore > awayScore
              ? 'L'
              : 'W';

          const spread = isHomeTeam ? homeScore - awayScore : awayScore - homeScore;
          const total = homeScore + awayScore;

          return (
            <Text key={index} style={{ color: 'white' }}>
              <Image
                source={{ uri: singleton.teamsX[opponentId].attributes.logo['='] }}
                style={{ width: 20, height: 20 }}
              />
              <Text>
                {winOrLoss} {awayScore} - {homeScore}
              </Text>
              <Text>{spread}</Text>
              <Text>{total}</Text>
            </Text>
          );
        }
      )}
    </View>
  );
};

export default MatchupList;
