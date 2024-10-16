import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';
import DataBoxBrackets from '../common/DataBoxBrackets';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import GameExtraData from './GameExtraData';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

interface Props {
  item: any;
  handleSelectedGame: (id: string) => void;
  selectedGame: string;
  selectedStat: string;
}

const GameData = ({ item, selectedGame, handleSelectedGame, selectedStat }: Props) => {
  const { singleton } = useContext(SingletonDataContextProvider);
  const isSelectedGame = item.id === selectedGame;

  const { gamelines } = item;

  const homeOverUnder = gamelines.home_spread.oprice ? 'O' : 'U';
  const awayOverUnder = gamelines.away_spread.oprice ? 'O' : 'U';

  const calculateData = (side: string | null, attribute: string | null, type: string) => {
    const statMap: { [key: string]: number } = { L5: 5, L10: 10, L25: 25 };
    const selectedStatData = statMap[selectedStat] || 10;
    const data = singleton.ms_calculate_hitrate_team(
      side ? item.matchup.attributes[side]['='] : null,
      item.matchup.attributes.hitrate['='],
      attribute
        ? attribute === 'total_under'
          ? gamelines[attribute].upoint
          : gamelines[attribute].opoint
        : null,
      type,
      selectedStatData
    );
    if (!data) return 'N/A';

    const splitNumbers = data.split('/');
    return `${((splitNumbers[0] * 1) / (splitNumbers[1] * 1)) * 100}%`;
  };

  return (
    <View style={styles.boxContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>{`${item.awayName} @ ${item.homeName}`}</Text>
        <Text style={styles.headingText}>{item.startTime}</Text>
      </View>

      <View style={styles.teamDataContainer}>
        <View style={styles.teamAndIconContainer}>
          <Text style={{ ...styles.teamText, position: 'absolute', top: -15, left: 2 }}>
            {item.awayName.substring(0, 3)}
          </Text>
          <Image source={{ uri: item.awayLogoImage }} style={styles.icon} resizeMode="contain" />
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
            secondContainerData={[calculateData('away', 'away_spread', 'spread')]}
            secondContainerStyle={{
              backgroundColor: variables.colorHeatMap(
                calculateData('away', 'away_spread', 'spread'),
                'hitrate'
              )
            }}
          />
          <DataBoxBrackets
            firstContainerData={[gamelines.away_h2h.oprice || gamelines.away_h2h.uprice || '-']}
            secondContainerData={[calculateData('away', null, 'h2h')]}
            secondContainerStyle={{
              backgroundColor: variables.colorHeatMap(calculateData('away', null, 'h2h'), 'hitrate')
            }}
          />
          <DataBoxBrackets
            firstContainerData={[
              `${awayOverUnder} ${awayOverUnder === 'O' ? gamelines.total_over.opoint : gamelines.total_under.upoint}`,
              awayOverUnder === 'O' ? gamelines.total_over.oprice : gamelines.total_under.uprice
            ]}
            secondContainerData={[
              item.awayName.substring(0, 3),
              calculateData(null, 'total_over', 'total_over')
            ]}
            thirdContainerData={[
              item.homeName.substring(0, 3),
              calculateData(null, 'total_under', 'total_under')
            ]}
            secondContainerStyle={{
              backgroundColor: variables.colorHeatMap(
                calculateData(null, 'total_over', 'total_over'),
                'hitrate'
              )
            }}
            thirdContainerStyle={{
              backgroundColor: variables.colorHeatMap(
                calculateData(null, 'total_under', 'total_under'),
                'hitrate'
              )
            }}
          />
        </View>
      </View>
      <View style={styles.teamDataContainer}>
        <View style={styles.teamAndIconContainer}>
          <Text style={{ ...styles.teamText, position: 'absolute', bottom: -15, left: 2 }}>
            {item.homeName.substring(0, 3)}
          </Text>
          <Image source={{ uri: item.homeLogoImage }} style={styles.icon} resizeMode="contain" />
        </View>
        <View style={styles.dataBoxContainer}>
          <DataBoxBrackets
            firstContainerData={[
              gamelines.home_spread.opoint || gamelines.home_spread.upoint || '-',
              gamelines.home_spread.oprice || gamelines.home_spread.uprice || '-'
            ]}
            secondContainerData={[calculateData('home', 'home_spread', 'spread')]}
            secondContainerStyle={{
              backgroundColor: variables.colorHeatMap(
                calculateData('home', 'home_spread', 'spread'),
                'hitrate'
              )
            }}
          />
          <DataBoxBrackets
            firstContainerData={[gamelines.home_h2h.oprice || gamelines.home_h2h.uprice || '-']}
            secondContainerData={[calculateData('home', null, 'h2h')]}
            secondContainerStyle={{
              backgroundColor: variables.colorHeatMap(calculateData('home', null, 'h2h'), 'hitrate')
            }}
          />
          <DataBoxBrackets
            firstContainerData={[
              `${homeOverUnder} ${homeOverUnder === 'O' ? gamelines.total_over.opoint : gamelines.total_under.upoint}`,
              homeOverUnder === 'O' ? gamelines.total_over.oprice : gamelines.total_under.uprice
            ]}
            secondContainerData={[
              item.homeName.substring(0, 3),
              calculateData(null, 'total_over', 'total_over')
            ]}
            thirdContainerData={[
              item.awayName.substring(0, 3),
              calculateData(null, 'total_under', 'total_under')
            ]}
            secondContainerStyle={{
              backgroundColor: variables.colorHeatMap(
                calculateData(null, 'total_over', 'total_over'),
                'hitrate'
              )
            }}
            thirdContainerStyle={{
              backgroundColor: variables.colorHeatMap(
                calculateData(null, 'total_under', 'total_under'),
                'hitrate'
              )
            }}
          />
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => handleSelectedGame(item.id)}
          style={{ paddingHorizontal: 20, marginBottom: 4 }}>
          <AntDesign name={isSelectedGame ? 'caretup' : 'caretdown'} size={14} color="white" />
        </TouchableOpacity>
        <View style={styles.viewGameButton}>
          <Text style={styles.viewGameButtonText}>View Game</Text>
          <FontAwesome5 name="angle-double-right" size={14} color="white" />
        </View>
      </View>
      {isSelectedGame && <GameExtraData data={item} />}
    </View>
  );
};

export default GameData;

const styles = StyleSheet.create({
  boxContainer: {
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
    paddingTop: 5,
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: variables.colors.black
  },
  viewGameButton: {
    position: 'absolute',
    right: 0,
    top: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewGameButtonText: {
    color: variables.colors.white,
    fontSize: 12,
    marginRight: 4
  }
});
