import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';

import ExpandedBettingData from './ExpandedBettingData';

const FloatingBettingMenu = () => {
  const [isBetSlipSelected, setIsBetSlipSelected] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsBetSlipSelected(!isBetSlipSelected)}
        activeOpacity={0.9}
        style={styles.mainInfoContainer}>
        <View style={styles.numberOfBetsCircle}>
          <Text style={styles.numberOfBetsText}>6</Text>
        </View>
        <View>
          <Text style={styles.betSlipText}>BET SLIP</Text>
        </View>
        <View style={styles.oddsPayContainer}>
          <Text style={styles.oddsText}>Parlay Odds + 856</Text>
          <Text style={styles.payText}>$10.00 pays $95.60</Text>
        </View>
        <View style={styles.sendToButtonContainer}>
          <Text style={styles.sendToButtonText}>Send to</Text>
          <Icon icon="fanDuel" />
        </View>
      </TouchableOpacity>
      {isBetSlipSelected && <ExpandedBettingData />}
    </View>
  );
};

export default FloatingBettingMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    backgroundColor: variables.colors.white,
    width: '90%',
    left: '5%',
    zIndex: 10,
    borderRadius: 25
  },
  mainInfoContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: variables.colors.black,
    backgroundColor: variables.colors.betSlipBackground
  },
  numberOfBetsCircle: {
    width: 45,
    height: 45,
    borderRadius: 40,
    backgroundColor: variables.colors.betSlipCircleBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberOfBetsText: {
    color: variables.colors.white,
    fontWeight: 'bold'
  },
  betSlipText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  oddsPayContainer: {
    alignItems: 'center'
  },
  oddsText: {
    fontSize: 10
  },
  payText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  sendToButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: variables.colors.betSlipSendButtonBackground,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 14
  },
  sendToButtonText: {
    fontSize: 10,
    fontWeight: 'bold'
  }
});
