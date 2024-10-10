import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import dummyChartImage from './dummyChartImage.png';
import dummyBarImage from './dummyBarImage.png';
import { variables } from '~/utils/mixins';
import BarChart from '../BarChart';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

interface Props {
  item: any;
}

const PlayerExtraData = ({ item }: Props) => {
  const [chartData, setChartData] = useState<any>({});
  const { initiateData, singleton, navigator, toolkit, dom } = useContext(
    SingletonDataContextProvider
  );
  useEffect(() => {
    // singleton.ms_calc_ev_hr(odds,
    //   propPoint,
    //   propArrow,
    //   performanceId,
    //   performanceHHR,
    //   attribute,
    //   hitratesSize = 10,
    //   cacheHitrate = {})

    const player = singleton.data.ticker?.lineups.find(
      (pl) => pl.player.attributes.name['='] === item.playerInfo.name
    );

    console.log(
      'ms_generate_stats_for_player',
      singleton.ms_generate_stats_for_player(toolkit, singleton.data.ticker, player)
    );
    console.log('item', player);
    singleton
      .ma_generate_chart_for_player(
        toolkit,
        null,
        navigator,
        null,
        {},
        singleton.data.ticker,
        player,
        JSON.parse(singleton.data.chartDefaults),
        'batter_hits',
        '10def'
      )
      .then((resp: any) => setChartData(resp));
  }, []);
  return (
    <View style={styles.extraDataContainer}>
      <View style={styles.divider} />
      {/* <Image source={dummyChartImage} style={styles.dummyImage} resizeMode="contain" /> */}

      {chartData?.bars && (
        <BarChart
          data={chartData.bars.map((item: any) => {
            return {
              label: item.againstName,
              value: item.value
            };
          })}
          width={350}
          height={200}
          barColor="#F8696B"
        />
      )}
      <View style={styles.divider} />
      <Text style={styles.extraDataHeading}> Matchup and Rankings</Text>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 8,
          backgroundColor: variables.colors.statsGreen,
          borderRadius: 20,
          borderColor: variables.colors.white,
          borderWidth: 1,
          marginVertical: 10
        }}>
        <Text
          style={{
            color: variables.colors.black,
            fontSize: 12,
            textTransform: 'uppercase'
          }}>{`Matchup grade ${item.matchGrade}`}</Text>
      </View>

      <Image source={dummyBarImage} style={styles.dummyImage} resizeMode="contain" />

      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 8,
          backgroundColor: variables.colors.lightGrey,
          borderRadius: 20,
          borderColor: variables.colors.white,
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 30
        }}>
        <Text
          style={{
            color: variables.colors.white,
            fontSize: 12
          }}>
          View injuries and Rankings
        </Text>
      </View>
    </View>
  );
};

export default PlayerExtraData;

const styles = StyleSheet.create({
  dummyImage: {
    width: 400,
    height: 200
  },
  divider: {
    height: 0.3,
    width: '60%',
    backgroundColor: variables.colors.activeGrey,
    marginTop: 4,
    marginBottom: 10,
    marginRight: '30%'
  },
  extraDataContainer: {
    alignItems: 'center'
  },
  extraDataHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colors.white
  }
});
