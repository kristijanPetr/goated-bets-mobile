import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { variables } from '~/utils/mixins';
import DataBoxBrackets from '../common/DataBoxBrackets';
import GamePropsDisplayStats from '../gameProps/GamePropsDisplayStats';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { calculateData } from '../gameProps/helper';

const GamePropsSection = () => {
  const { selectedGames, singleton } = useContext(SingletonDataContextProvider);
  const [selectedStat, setSelectedStat] = useState<string>('L5');

  if (!selectedGames) {
    return null;
  }
  const { gamelines } = selectedGames;

  const homeOverUnder = gamelines.home_spread.oprice ? 'O' : 'U';
  const awayOverUnder = gamelines.away_spread.oprice ? 'O' : 'U';

  const getData = (side: string, attribute: string | null, type: string) => {
    return calculateData(selectedStat, singleton, selectedGames, side, attribute, type);
  };

  return (
    <View style={styles.container}>
      <GamePropsDisplayStats selectedStat={selectedStat} setSelectedStat={setSelectedStat} />
      <ScrollView style={{ marginTop: 4, marginBottom: 10 }}>
        <View style={styles.boxContainer}>
          <View style={styles.headerContainer}>
            <Text
              style={
                styles.headingText
              }>{`${selectedGames.awayName} @ ${selectedGames.homeName}`}</Text>
            <Text style={styles.headingText}>{selectedGames.startTime}</Text>
          </View>

          <View style={styles.teamDataContainer}>
            <View style={styles.teamAndIconContainer}>
              <Text style={{ ...styles.teamText, position: 'absolute', top: -15, left: 2 }}>
                {selectedGames.awayName.substring(0, 3)}
              </Text>
              <Image
                source={{ uri: selectedGames.awayLogoImage }}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.dataBoxContainer}>
              <View style={styles.dataBoxLegendContainer}>
                <Text style={styles.dataBoxLegendText}>Spread</Text>
                <Text style={styles.dataBoxLegendText}>Moneyline</Text>
                <Text style={styles.dataBoxLegendText}>Total</Text>
              </View>
              <DataBoxBrackets
                firstContainerData={[
                  gamelines.away_spread.opoint || gamelines.away_spread.upoint || '-',
                  gamelines.away_spread.oprice || gamelines.away_spread.uprice || '-'
                ]}
                secondContainerData={[getData('away', 'away_spread', 'spread')]}
                secondContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('away', 'away_spread', 'spread'),
                    'percentage'
                  )
                }}
              />
              <DataBoxBrackets
                firstContainerData={[gamelines.away_h2h.oprice || gamelines.away_h2h.uprice || '-']}
                secondContainerData={[getData('away', null, 'moneyline')]}
                secondContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('away', null, 'moneyline'),
                    'percentage'
                  )
                }}
              />
              <DataBoxBrackets
                firstContainerData={[
                  `${awayOverUnder} ${awayOverUnder === 'O' ? gamelines.total_over.opoint : gamelines.total_under.upoint}`,
                  awayOverUnder === 'O' ? gamelines.total_over.oprice : gamelines.total_under.uprice
                ]}
                secondContainerData={[
                  selectedGames.awayName.substring(0, 3),
                  getData('away', 'total_over', 'total_over')
                ]}
                thirdContainerData={[
                  selectedGames.homeName.substring(0, 3),
                  getData('away', 'total_under', 'total_under')
                ]}
                secondContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('away', 'total_over', 'total_over'),
                    'percentage'
                  )
                }}
                thirdContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('away', 'total_under', 'total_under'),
                    'percentage',
                    true
                  )
                }}
              />
            </View>
          </View>
          <View style={styles.teamDataContainer}>
            <View style={styles.teamAndIconContainer}>
              <Text style={{ ...styles.teamText, position: 'absolute', bottom: -15, left: 2 }}>
                {selectedGames.homeName.substring(0, 3)}
              </Text>
              <Image
                source={{ uri: selectedGames.homeLogoImage }}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.dataBoxContainer}>
              <DataBoxBrackets
                firstContainerData={[
                  gamelines.home_spread.opoint || gamelines.home_spread.upoint || '-',
                  gamelines.home_spread.oprice || gamelines.home_spread.uprice || '-'
                ]}
                secondContainerData={[getData('home', 'home_spread', 'spread')]}
                secondContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('home', 'home_spread', 'spread'),
                    'percentage'
                  )
                }}
              />
              <DataBoxBrackets
                firstContainerData={[gamelines.home_h2h.oprice || gamelines.home_h2h.uprice || '-']}
                secondContainerData={[getData('home', null, 'moneyline')]}
                secondContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('home', null, 'moneyline'),
                    'percentage'
                  )
                }}
              />
              <DataBoxBrackets
                firstContainerData={[
                  `${homeOverUnder} ${homeOverUnder === 'O' ? gamelines.total_over.opoint : gamelines.total_under.upoint}`,
                  homeOverUnder === 'O' ? gamelines.total_over.oprice : gamelines.total_under.uprice
                ]}
                secondContainerData={[
                  selectedGames.homeName.substring(0, 3),
                  getData('home', 'total_over', 'total_over')
                ]}
                thirdContainerData={[
                  selectedGames.awayName.substring(0, 3),
                  getData('home', 'total_under', 'total_under')
                ]}
                secondContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('home', 'total_over', 'total_over'),
                    'percentage'
                  )
                }}
                thirdContainerStyle={{
                  backgroundColor: variables.getHeatmapColor(
                    getData('home', 'total_under', 'total_under'),
                    'percentage',
                    true
                  )
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.totalBox}>
          <LinearGradient
            colors={[variables.colors.backgroundLinearDark, variables.colors.grey]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}>
            <Text style={styles.totalHeading}>Alternate Total</Text>
          </LinearGradient>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '50%',
              left: '20%',
              marginBottom: 10
            }}>
            <Text>Over</Text>
            <Text>Under</Text>
          </View>

          <ScrollView style={{ width: '50%', left: '25%' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.totalBox}>
          <LinearGradient
            colors={[variables.colors.backgroundLinearDark, variables.colors.grey]}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}>
            <Text style={styles.totalHeading}>Alternate Spreads</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

export default GamePropsSection;

const styles = StyleSheet.create({
  container: {
    height: 600,
    marginTop: 10
  },
  boxContainer: {
    height: 150,
    width: '100%',
    backgroundColor: variables.colors.grey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  headingText: {
    fontSize: 12,
    color: variables.colors.white
  },
  teamDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  teamAndIconContainer: {
    marginRight: 10
  },
  teamText: {
    color: variables.colors.white,
    fontSize: 10
  },
  dataBoxContainer: {
    height: 40,
    flexDirection: 'row'
  },
  icon: {
    width: 24,
    height: 24
  },
  dataBoxLegendContainer: {
    position: 'absolute',
    top: -18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '96%'
  },
  dataBoxLegendText: {
    color: variables.colors.white,
    fontSize: 10
  },
  totalBox: {
    height: 350,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: variables.colors.black,
    backgroundColor: variables.colors.grey
  },
  totalHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: variables.colors.white,
    marginLeft: 8
  },
  background: {
    height: 20,
    marginHorizontal: 14,
    marginVertical: 10,
    justifyContent: 'center'
  }
});
