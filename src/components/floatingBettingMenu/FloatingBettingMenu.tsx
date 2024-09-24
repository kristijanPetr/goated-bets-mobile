import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';

const FloatingBettingMenu = () => {
  const [isBetSlipSelected, setIsBetSlipSelected] = useState<boolean>(false);

  const data = [
    {
      id: '1',
      playerName: 'P. Mahomes',
      stats: 'Over 250 Passing Yards',
      l5: 20,
      l10: 40,
      streak: 1,
      odds: -115
    },
    {
      id: '2',
      playerName: 'P. Mahomes',
      stats: 'Over 250 Passing Yards',
      l5: 20,
      l10: 40,
      streak: 1,
      odds: -115
    },
    {
      id: '3',
      playerName: 'P. Mahomes',
      stats: 'Over 250 Passing Yards',
      l5: 20,
      l10: 40,
      streak: 1,
      odds: -115,
      hasCloseButton: true
    },
    {
      id: '4',
      playerName: 'P. Mahomes',
      stats: 'Over 250 Passing Yards',
      l5: 20,
      l10: 40,
      streak: 1,
      odds: -115
    },
    {
      id: '5',
      playerName: 'P. Mahomes',
      stats: 'Over 250 Passing Yards',
      l5: 20,
      l10: 40,
      streak: 1,
      odds: -115
    },
    {
      id: '6',
      playerName: 'P. Mahomes',
      stats: 'Over 250 Passing Yards',
      l5: 20,
      l10: 40,
      streak: 1,
      odds: -115
    },
    {
      id: '7',
      playerName: 'P. Mahomes',
      stats: 'Over 250 Passing Yards',
      l5: 20,
      l10: 40,
      streak: 1,
      odds: -115
    }
  ];

  const renderItem = ({ item, index }: any) => {
    const isLastElement = index === data.length - 1;
    return (
      <View
        style={{
          ...styles.itemContainer,
          borderBottomWidth: !isLastElement ? 0.2 : 0,
          borderColor: !isLastElement ? variables.colors.activeGrey : variables.colors.white
        }}>
        <Text style={styles.itemOddsText}>{item.odds}</Text>
        <View>
          <Text style={styles.itemPlayerName}>{item.playerName}</Text>
          <Text style={styles.itemStats}>{item.stats}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.itemStats, marginRight: 4 }}>l5:</Text>
              <View style={styles.box}>
                <Text style={styles.itemStats}>{item.l5}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <Text style={{ ...styles.itemStats, marginRight: 4 }}>L10:</Text>
              <View style={styles.box}>
                <Text style={styles.itemStats}>{item.l10}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <Text style={{ ...styles.itemStats, marginRight: 4 }}>Streak:</Text>
              <View style={styles.box}>
                <Text style={styles.itemStats}>{item.streak}</Text>
              </View>
            </View>
          </View>
        </View>
        {item.hasCloseButton ? (
          <View style={styles.closeButton}>
            <Fontisto name="close-a" size={20} color="white" />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.selectButton}>
              <AntDesign name="left" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.selectButton, marginLeft: 6 }}>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderExtraData = () => {
    return (
      <View>
        <View style={{ height: 300, width: '92%', left: '4%' }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 60 }}
          />
        </View>
        <View style={styles.clearBetslipContainer}>
          <View style={styles.clearBetslipButton}>
            <Text style={{ color: variables.colors.white, fontSize: 14 }}>Clear betslip</Text>
          </View>
        </View>
      </View>
    );
  };

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
      {isBetSlipSelected && renderExtraData()}
    </View>
  );
};

export default FloatingBettingMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    backgroundColor: variables.colors.betSlipBackground,
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
    borderColor: variables.colors.black
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
    fontSize: 12,
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
  betSlipText: {
    fontSize: 16,
    fontWeight: 'bold'
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
  selectButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: variables.colors.betSlipSendButtonBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearBetslipContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    zIndex: 1,
    backgroundColor: variables.colors.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearBetslipButton: {
    height: 40,
    width: '90%',
    backgroundColor: variables.colors.statsRed,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    height: 50,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4
  },
  itemOddsText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPlayerName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  itemStats: {
    fontSize: 10
  },
  box: {
    width: 25,
    backgroundColor: variables.colors.statsRed,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    width: 60,
    height: 60,
    top: -5,
    right: 0,
    backgroundColor: variables.colors.statsRed,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
