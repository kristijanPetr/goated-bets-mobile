import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TickerComponent = ({
  ma_go,
  ma_call,
  i1v,
  ticker,
  singleton,
  ms_calculate_hitrate_team,
  ma_upsert_bet
}) => {
  // Method to handle placing a bet
  const handleBet = (market, point, team, price) => {
    ma_upsert_bet(
      null,
      i1v['yyyymmdd'],
      null,
      i1v['sport'],
      i1v['bookmaker'],
      market,
      point,
      i1v['matchup'].attributes['id']['='],
      team,
      '',
      '',
      price
    );
  };

  // Method to select or navigate to the ticker
  const handleTickerSelectOrNavigate = async () => {
    if (i1v === ticker) {
      try {
        await ma_go(i1v['matchup']);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await ma_call(null, 'ma_reboot_ticker', i1v);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Method to calculate hit rate for a team
  const calculateHitRate = (teamId, hitrateData, point, attribute, hitratesSize = 10) => {
    let hitrates = JSON.parse(hitrateData),
      outputCount = 0,
      outputTotal = 0;

    if (teamId !== null) {
      if (hitrates[teamId] && Array.isArray(hitrates[teamId]['side'])) {
        hitrates[teamId]['side'].slice(0, hitratesSize).forEach((side, index) => {
          if (
            attribute === 'spread' &&
            parseInt(hitrates[teamId][`${side}_score`][index]) -
              parseInt(hitrates[teamId][`${side === 'home' ? 'away' : 'home'}_score`][index]) >=
              parseFloat(point)
          ) {
            outputCount += 1;
          }
          outputTotal += 1;
        });
      }
    } else if (attribute === 'total_over' || attribute === 'total_under') {
      Object.keys(hitrates).forEach((teamId) => {
        if (hitrates[teamId] && Array.isArray(hitrates[teamId]['side'])) {
          hitrates[teamId]['side'].slice(0, hitratesSize).forEach((side, index) => {
            const totalPoints =
              parseInt(hitrates[teamId][`${side}_score`][index]) +
              parseInt(hitrates[teamId][`${side === 'home' ? 'away' : 'home'}_score`][index]);
            if (
              (attribute === 'total_over' && totalPoints >= parseFloat(point)) ||
              (attribute === 'total_under' && totalPoints <= parseFloat(point))
            ) {
              outputCount += 1;
            }
            outputTotal += 1;
          });
        }
      });
    }

    return `${outputCount}/${outputTotal}`;
  };

  return (
    <ScrollView>
      {/* Ticker Header */}
      <View style={styles.tickersHeader}>
        <View style={{ width: '23.6%' }}>
          <Text style={styles.headerText}>{i1v['startTime']}</Text>
        </View>
        <View style={{ width: '76.4%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headerSubText}>Spread</Text>
          <Text style={styles.headerSubText}>Over/Under</Text>
          <Text style={styles.headerSubText}>Moneyline</Text>
        </View>
      </View>

      {/* Ticker Body */}
      <View style={styles.tickersBody}>
        <View style={{ width: '23.6%' }}>
          <View>
            <Text style={styles.opponentsText}>
              <Image source={require('./pixel.png')} style={i1v['awayLogoStyle']} />
              {i1v['awayName']}
              <Text style={styles.supText}>{i1v['awayRecord']}</Text>
            </Text>
            <Text>@</Text>
            <Text style={styles.opponentsText}>
              <Image source={require('./pixel.png')} style={i1v['homeLogoStyle']} />
              {i1v['homeName']}
              <Text style={styles.supText}>{i1v['homeRecord']}</Text>
            </Text>
          </View>
        </View>
        <View style={{ width: '76.4%', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Spread */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() =>
                handleBet(
                  'away_spread',
                  'o ' + i1v['gamelines']['away_spread']['opoint'],
                  i1v['matchup'].attributes['away']['='],
                  i1v['gamelines']['away_spread']['oprice']
                )
              }>
              <View style={styles.button}>
                <Text>{i1v['gamelines']['away_spread']['opoint']}</Text>
                <Text>
                  {(i1v['gamelines']['away_spread']['oprice'] > 0 ? '+' : '') +
                    i1v['gamelines']['away_spread']['oprice']}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                handleBet(
                  'home_spread',
                  'o ' + i1v['gamelines']['home_spread']['opoint'],
                  i1v['matchup'].attributes['home']['='],
                  i1v['gamelines']['home_spread']['oprice']
                )
              }>
              <View style={styles.button}>
                <Text>{i1v['gamelines']['home_spread']['opoint']}</Text>
                <Text>
                  {(i1v['gamelines']['home_spread']['oprice'] > 0 ? '+' : '') +
                    i1v['gamelines']['home_spread']['oprice']}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Over/Under */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() =>
                handleBet(
                  'total_over',
                  'o ' + i1v['gamelines']['total_over']['opoint'],
                  '',
                  i1v['gamelines']['total_over']['oprice']
                )
              }>
              <View style={styles.button}>
                <Text>O {i1v['gamelines']['total_over']['opoint']}</Text>
                <Text>
                  {(i1v['gamelines']['total_over']['oprice'] > 0 ? '+' : '') +
                    i1v['gamelines']['total_over']['oprice']}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                handleBet(
                  'total_under',
                  'u ' + i1v['gamelines']['total_under']['upoint'],
                  '',
                  i1v['gamelines']['total_under']['uprice']
                )
              }>
              <View style={styles.button}>
                <Text>U {i1v['gamelines']['total_under']['upoint']}</Text>
                <Text>
                  {(i1v['gamelines']['total_under']['uprice'] > 0 ? '+' : '') +
                    i1v['gamelines']['total_under']['uprice']}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Moneyline */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() =>
                handleBet(
                  'away_h2h',
                  'o 0',
                  i1v['matchup'].attributes['away']['='],
                  i1v['gamelines']['away_h2h']['oprice']
                )
              }>
              <Text>
                {(i1v['gamelines']['away_h2h']['oprice'] > 0 ? '+' : '') +
                  i1v['gamelines']['away_h2h']['oprice']}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                handleBet(
                  'home_h2h',
                  'o 0',
                  i1v['matchup'].attributes['home']['='],
                  i1v['gamelines']['home_h2h']['oprice']
                )
              }>
              <Text>
                {(i1v['gamelines']['home_h2h']['oprice'] > 0 ? '+' : '') +
                  i1v['gamelines']['home_h2h']['oprice']}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Ticker Footer */}
      {i1v === ticker && singleton['teamsX'][ticker['matchup'].attributes['away']['=']] && (
        <View style={styles.tickersFooter}>{/* Render additional content */}</View>
      )}

      {/* Injuries */}
      {i1v === ticker && (i1v['awayInjuries'].length || i1v['homeInjuries'].length) && (
        <Text style={styles.tickersInjuries}>
          Key injuries:{' '}
          {i1v['awayInjuries']
            .map((injury, index) => `${index === 0 ? '' : ', '}${injury.name}`)
            .join('')}
        </Text>
      )}

      {/* View Game Button */}
      {i1v === ticker && (
        <TouchableOpacity style={styles.tickersGo} onPress={handleTickerSelectOrNavigate}>
          <View style={styles.button}>
            <Text>View Game</Text>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tickersHeader: {
    backgroundColor: '#000',
    borderBottomWidth: 2,
    borderColor: '#8e8332',
    padding: 5,
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 18,
    textTransform: 'uppercase'
  },
  headerSubText: {
    color: '#C2B444',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  tickersBody: {
    backgroundColor: '#0E0E0E',
    flexDirection: 'row',
    padding: 5
  },
  opponentsText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  supText: {
    fontSize: 10
  },
  buttonWrapper: {
    width: '33%'
  },
  button: {
    backgroundColor: '#000',
    borderColor: '#8e8332',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5
  },
  tickersFooter: {
    // Style for footer
  },
  tickersInjuries: {
    fontSize: 18,
    paddingHorizontal: 30
  },
  tickersGo: {
    paddingHorizontal: 30,
    marginTop: 10
  }
});

export default TickerComponent;
