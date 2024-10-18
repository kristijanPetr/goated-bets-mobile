import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { variables } from '~/utils/mixins';
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
  const isSelectedGame = `${item.homeName}-${item.awayName}` === selectedGame;

  const { gamelines } = item;

  const homeOverUnder = gamelines.home_spread.oprice ? 'O' : 'U';
  const awayOverUnder = gamelines.away_spread.oprice ? 'O' : 'U';

  const calculateData = (side: string, attribute: string | null, type: string) => {
    const statMap: { [key: string]: number | string } = {
      L5: 5,
      L10: 10,
      L25: 25,
      Seasson: 'Seasson',
      H2H: 'H2H'
    };

    let selectedStatData = statMap[selectedStat] || 10;
    const data = singleton.ms_calculate_hitrate_team(
      item.matchup.attributes[side]['='],
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
    if (data === 'N/A') return data;

    const splitNumbers = data.split('/');
    return `${(((splitNumbers[0] * 1) / (splitNumbers[1] * 1)) * 100).toFixed(0)}%`;
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
              backgroundColor: variables.getHeatmapColor(
                calculateData('away', 'away_spread', 'spread'),
                'percentage'
              )
            }}
          />
          <DataBoxBrackets
            firstContainerData={[gamelines.away_h2h.oprice || gamelines.away_h2h.uprice || '-']}
            secondContainerData={[calculateData('away', null, 'moneyline')]}
            secondContainerStyle={{
              backgroundColor: variables.getHeatmapColor(
                calculateData('away', null, 'moneyline'),
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
              item.awayName.substring(0, 3),
              calculateData('away', 'total_over', 'total_over')
            ]}
            thirdContainerData={[
              item.homeName.substring(0, 3),
              calculateData('away', 'total_under', 'total_under')
            ]}
            secondContainerStyle={{
              backgroundColor: variables.getHeatmapColor(
                calculateData('away', 'total_over', 'total_over'),
                'percentage'
              )
            }}
            thirdContainerStyle={{
              backgroundColor: variables.getHeatmapColor(
                calculateData('away', 'total_under', 'total_under'),
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
              backgroundColor: variables.getHeatmapColor(
                calculateData('home', 'home_spread', 'spread'),
                'percentage'
              )
            }}
          />
          <DataBoxBrackets
            firstContainerData={[gamelines.home_h2h.oprice || gamelines.home_h2h.uprice || '-']}
            secondContainerData={[calculateData('home', null, 'moneyline')]}
            secondContainerStyle={{
              backgroundColor: variables.getHeatmapColor(
                calculateData('home', null, 'moneyline'),
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
              item.homeName.substring(0, 3),
              calculateData('home', 'total_over', 'total_over')
            ]}
            thirdContainerData={[
              item.awayName.substring(0, 3),
              calculateData('home', 'total_under', 'total_under')
            ]}
            secondContainerStyle={{
              backgroundColor: variables.getHeatmapColor(
                calculateData('home', 'total_over', 'total_over'),
                'percentage'
              )
            }}
            thirdContainerStyle={{
              backgroundColor: variables.getHeatmapColor(
                calculateData('home', 'total_under', 'total_under'),
                'percentage',
                true
              )
            }}
          />
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => handleSelectedGame(`${item.homeName}-${item.awayName}`)}
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
