import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';
import DataBoxTwoBrackets from '../common/DataBoxTwoBrackets';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface Props {
  item: any;
}

const GameData = ({ item }: Props) => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>{item.game}</Text>
        <Text style={styles.headingText}>{item.time}</Text>
      </View>

      <View style={styles.teamDataContainer}>
        <View style={styles.teamAndIconContainer}>
          <Text style={{ ...styles.teamText, position: 'absolute', top: -15, left: 2 }}>HOU</Text>
          <Icon icon="bullLogo" style={styles.icon} />
        </View>
        <View style={styles.dataBoxContainer}>
          <DataBoxTwoBrackets firstContainerData={['+3.0', '-118']} secondContainerData={['40%']} />
          <DataBoxTwoBrackets firstContainerData={['124']} secondContainerData={['40%']} />
          <DataBoxTwoBrackets
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
          <DataBoxTwoBrackets
            firstContainerData={['+3.0', '-118']}
            secondContainerData={['20%']}
            secondContainerStyle={{ backgroundColor: variables.colors.statsRed }}
          />
          <DataBoxTwoBrackets firstContainerData={['124']} secondContainerData={['40%']} />
          <DataBoxTwoBrackets
            firstContainerData={['0 46.5', '-108']}
            secondContainerData={['BAL', '100%']}
            thirdContainerData={['KC', '40%']}
            secondContainerStyle={{ backgroundColor: variables.colors.statsGreen }}
          />
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <View>
          <AntDesign name={'caretdown'} size={14} color="white" />
        </View>
        <View style={styles.viewGameButton}>
          <Text style={styles.viewGameButtonText}>View Game</Text>
          <FontAwesome5 name="angle-double-right" size={14} color="white" />
        </View>
      </View>
    </View>
  );
};

export default GameData;

const styles = StyleSheet.create({
  boxContainer: {
    height: 170,
    width: '100%',
    backgroundColor: variables.colors.grey,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
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
  bottomButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  viewGameButton: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewGameButtonText: {
    color: variables.colors.white,
    fontSize: 12,
    marginRight: 4
  }
});
