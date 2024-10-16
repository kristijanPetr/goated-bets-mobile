import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';
import DataBoxBrackets from '../common/DataBoxBrackets';
import GamePropsDisplayStats from '../gameProps/GamePropsDisplayStats';

const GamePropsSection = () => {
  const [selectedStat, setSelectedStat] = useState<string>('L5');

  return (
    <View style={styles.container}>
      <GamePropsDisplayStats selectedStat={selectedStat} setSelectedStat={setSelectedStat} />
      <ScrollView style={{ marginTop: 4, marginBottom: 10 }}>
        <View style={styles.boxContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headingText}>Baltimore Ravens @ Kansas City Chiefs</Text>
            <Text style={styles.headingText}>8:20pm EST</Text>
          </View>

          <View style={styles.teamDataContainer}>
            <View style={styles.teamAndIconContainer}>
              <Text style={{ ...styles.teamText, position: 'absolute', top: -15, left: 2 }}>
                HOU
              </Text>
              <Icon icon="bullLogo" style={styles.icon} />
            </View>
            <View style={styles.dataBoxContainer}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['40%']}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
              <DataBoxBrackets
                firstContainerData={['0 46.5', '-108']}
                secondContainerData={['BAL', '0%']}
                thirdContainerData={['KC', '60%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <View style={styles.dataBoxLegendContainer}>
                <Text style={styles.dataBoxLegendText}>Spread</Text>
                <Text style={styles.dataBoxLegendText}>Moneyline</Text>
                <Text style={styles.dataBoxLegendText}>Total</Text>
              </View>
            </View>
          </View>
          <View style={styles.teamDataContainer}>
            <View style={styles.teamAndIconContainer}>
              <Text style={{ ...styles.teamText, position: 'absolute', bottom: -15, left: 2 }}>
                LAC
              </Text>
              <Icon icon="LClogo" style={styles.icon} />
            </View>
            <View style={styles.dataBoxContainer}>
              <DataBoxBrackets
                firstContainerData={['+3.0', '-118']}
                secondContainerData={['20%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
              />
              <DataBoxBrackets firstContainerData={['124']} secondContainerData={['40%']} />
              <DataBoxBrackets
                firstContainerData={['0 46.5', '-108']}
                secondContainerData={['BAL', '100%']}
                thirdContainerData={['KC', '40%']}
                secondContainerStyle={{ backgroundColor: variables.colors.statsGreen }}
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
