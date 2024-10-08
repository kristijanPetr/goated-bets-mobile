import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { variables } from '~/utils/mixins';
import { Swipeable } from 'react-native-gesture-handler';

const ExpandedBettingData = () => {
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

  const renderButtons = (item: any) => {
    return (
      <View style={styles.closeButton}>
        <Fontisto name="close-a" size={20} color="white" />
      </View>
    );
  };
  const renderItem = ({ item, index }: any) => {
    const isLastElement = index === data.length - 1;

    return (
      <Swipeable renderRightActions={() => renderButtons(item)}>
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
          <View style={styles.selectButtonContainer}>
            <TouchableOpacity style={styles.selectButton}>
              <AntDesign name="left" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.selectButton, marginLeft: 6 }}>
              <AntDesign name="right" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View>
      <View style={styles.container}>
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
          <Text style={styles.clearBetslipButtonText}>Clear betslip</Text>
        </View>
      </View>
    </View>
  );
};

export default ExpandedBettingData;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '92%',
    left: '4%'
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
  clearBetslipButtonText: {
    color: variables.colors.white,
    fontSize: 12
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
  },
  selectButtonContainer: { flexDirection: 'row', alignItems: 'center' },
  selectButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: variables.colors.betSlipSendButtonBackground,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
