import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import dummyPlayerImage from './dummyPlayerImage.png';
import { variables } from '~/utils/mixins';
import PlayerExtraData from './PlayerExtraData';

interface Props {
  item: any;
  selectedPlayer: string;
  handleSelectedPlayer: (id: string) => void;
}

const PlayerBox = ({ item, selectedPlayer, handleSelectedPlayer }: Props) => {
  const isSelectedPlayer = item.id === selectedPlayer;

  return (
    <TouchableOpacity
      onPress={() => handleSelectedPlayer(item.id)}
      key={item.id}
      style={styles.touchableContainer}
      activeOpacity={1}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={dummyPlayerImage} style={styles.dummyPlayerImage} resizeMode="contain" />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.textName}>{`${item.playerName} (${item.position})`}</Text>
          <Text style={styles.textStats}>{item.stats}</Text>
          <Text style={styles.textMatch}>{item.match}</Text>
        </View>
        <View style={styles.barContainer}>
          <View
            style={{
              ...styles.bar,
              backgroundColor: variables.colors.statsYellow
            }}>
            <Text style={styles.textBar}>{`${item.l5}%`}</Text>
          </View>
          <View style={{ ...styles.bar, backgroundColor: variables.colors.statsRed }}>
            <Text style={styles.textBar}> {item.streak}</Text>
          </View>
          <View style={{ ...styles.bar, backgroundColor: variables.colors.statsGreen }}>
            <Text style={styles.textBar}>{item.matchGrade}</Text>
          </View>
        </View>
        <View style={styles.oddsContainer}>
          <View style={styles.oddsBox}>
            <Text style={styles.oddsText}>{`+${item.odds}`}</Text>
          </View>
        </View>
      </View>

      {isSelectedPlayer && <PlayerExtraData item={item} />}
    </TouchableOpacity>
  );
};

export default PlayerBox;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center'
  },
  touchableContainer: {
    marginBottom: 10,
    backgroundColor: variables.colors.grey
  },
  imageContainer: {
    height: 60,
    width: '12%'
  },
  nameContainer: {
    width: '36%',
    marginLeft: '2%'
  },
  textName: {
    fontSize: 10,
    color: variables.colors.white
  },
  textStats: {
    fontSize: 12,
    fontWeight: 'bold',
    color: variables.colors.white
  },
  textMatch: {
    fontSize: 8,
    color: variables.colors.white
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '30%'
  },
  bar: {
    height: 25,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBar: {
    fontSize: 10
  },
  oddsContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  oddsBox: {
    height: 35,
    width: 60,
    backgroundColor: variables.colors.lightGrey,
    borderWidth: 1,
    borderColor: variables.colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  oddsText: {
    color: variables.colors.white,
    fontSize: 12
  },

  dummyPlayerImage: {
    width: 62,
    height: 62
  }
});