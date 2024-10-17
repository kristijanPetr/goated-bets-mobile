import React, { useContext, useEffect, useState } from 'react';
import { Image, LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { variables } from '~/utils/mixins';
import BarChart from '../BarChart';
const dummyBarImage = require('./dummyBarImage.png');

interface Props {
  item: any;
}

const PlayerExtraData = ({ item }: Props) => {
  const { singleton, navigator, toolkit, selectedGames } = useContext(SingletonDataContextProvider);
  const [chartData, setChartData] = useState<any>({});
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  useEffect(() => {
    if (selectedGames) {
      const player = selectedGames.lineups.find(
        (pl: any) => pl.player.attributes.name['='] === item.playerInfo.name
      );

      // console.log(
      //   'ms_generate_stats_for_player',
      //   singleton.ms_generate_stats_for_player(toolkit, singleton.data.ticker, player)
      // );

      singleton
        .ma_generate_chart_for_player(
          toolkit,
          null,
          navigator,
          null,
          {},
          selectedGames,
          player,
          JSON.parse(singleton.data.chartDefaults),
          item.stats.key,
          'recent'
        )
        .then((resp: any) => {
          if (resp.bars.length > 10) {
            return setChartData({
              ...resp,
              bars: resp.bars.slice(resp.bars.length - 10, resp.bars.length)
            });
          }
          return setChartData(resp);
        })
        .catch((err: any) => {
          setChartData({ bars: null });
        });
    }
  }, [selectedGames]);

  return (
    <View style={styles.extraDataContainer} onLayout={handleLayout}>
      <View style={styles.divider} />
      <Text style={styles.extraDataHeading}> Last 10 Games</Text>
      {chartData?.loaded === true ? (
        <BarChart
          data={chartData.bars.map((item: any) => {
            return {
              label: item.againstName,
              value: item.value
            };
          })}
          width={containerWidth}
          height={250}
          barColor="#F8696B"
          meanValue={item.stats.point}
          hasRevertedColors={item.stats.name === 'Under'}
        />
      ) : (
        <View style={{ height: 250, width: containerWidth, marginTop: 20 }} />
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
          }}>{`Matchup grade N/A`}</Text>
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
    width: '100%',
    backgroundColor: variables.colors.activeGrey,
    marginTop: 4,
    marginBottom: 10
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
