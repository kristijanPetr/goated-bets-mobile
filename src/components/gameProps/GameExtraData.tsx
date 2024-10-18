import { Image, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { variables } from '~/utils/mixins';

import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import BarChart from '../BarChart';

interface Props {
  data: any;
}

const GameExtraData = ({ data }: Props) => {
  const { singleton, toolkit, navigator } = useContext(SingletonDataContextProvider);
  const [selectedStat, setSelectedStat] = useState<string>('spread');
  const [chartDataHome, setChartDataHome] = useState<any>({});
  const [chartDataAway, setChartDataAway] = useState<any>({});

  const handleSelectStats = (id: string) => {
    return setSelectedStat(id);
  };
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const chartMarketHome =
    selectedStat === 'total_under' || selectedStat === 'total_over'
      ? selectedStat
      : `home_${selectedStat}`;
  const chartMarketAway =
    selectedStat === 'total_under' || selectedStat === 'total_over'
      ? selectedStat
      : `away_${selectedStat}`;

  useEffect(() => {
    singleton
      .ma_generate_chart_for_team(
        toolkit,
        null,
        navigator,
        null,
        {},
        data,
        'home',
        JSON.parse(singleton.data.chartDefaults),
        chartMarketHome,
        ''
      )
      .then((resp: any) => {
        if (resp.bars.length > 5) {
          return setChartDataHome({
            ...resp,
            bars: resp.bars.slice(resp.bars.length - 5, resp.bars.length)
          });
        }

        return setChartDataHome(resp);
      })
      .catch((err: any) => {
        setChartDataHome({ bars: null });
      });
    singleton
      .ma_generate_chart_for_team(
        toolkit,
        null,
        navigator,
        null,
        {},
        data,
        'away',
        JSON.parse(singleton.data.chartDefaults),
        chartMarketAway,
        ''
      )
      .then((resp: any) => {
        if (resp.bars.length > 5) {
          return setChartDataAway({
            ...resp,
            bars: resp.bars.slice(resp.bars.length - 5, resp.bars.length)
          });
        }

        return setChartDataAway(resp);
      })
      .catch((err: any) => {
        setChartDataAway({ bars: null });
      });
  }, [selectedStat]);

  const statsOptions = [
    { name: 'Spread', id: 'spread' },
    { name: 'Moneyline', id: 'h2h' },
    { name: 'Total Over', id: 'total_over' },
    { name: 'Total Under', id: 'total_under' }
  ];

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.statsSelectContainer}>
        {statsOptions.map((item) => {
          const isSelectedStat = selectedStat.includes(item.id);

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => handleSelectStats(item.id)}
              style={{
                ...styles.statsContainer,
                backgroundColor: isSelectedStat
                  ? variables.colors.activeGrey
                  : variables.colors.lightGrey
              }}>
              <Text
                style={{
                  ...styles.statText,
                  color: isSelectedStat ? variables.colors.black : variables.colors.white
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.headingText}>Last 5 Games</Text>
      <View style={styles.chartsContainer}>
        <View style={{ width: '50%' }}>
          <View style={styles.teamLogoAndNameContainer}>
            <Image source={{ uri: data.awayLogoImage }} style={styles.icon} resizeMode="contain" />
            <Text style={styles.teamNamesText}>{data.awayName}</Text>
          </View>
          {chartDataAway?.bars && chartDataAway?.bars.length > 0 ? (
            <BarChart
              data={chartDataAway.bars.map((item: any) => {
                return {
                  label: item.againstName,
                  value:
                    item.value === 'W' || item.value === 'L'
                      ? item.value === 'W'
                        ? 1
                        : 0
                      : item.value
                };
              })}
              width={containerWidth / 2 - 20}
              height={150}
              barColor="#F8696B"
              meanValue={
                chartDataAway.bars[0].value === 'W' || chartDataAway.bars[0].value === 'L'
                  ? 0.5
                  : chartDataAway.statsPoint
              }
              showWinOrLose={
                chartDataAway.bars[0].value === 'W' || chartDataAway.bars[0].value === 'L'
                  ? true
                  : false
              }
            />
          ) : (
            <View style={{ height: 150, width: containerWidth / 2 - 20, marginTop: 20 }} />
          )}
        </View>
        <View style={{ width: '50%' }}>
          <View style={styles.teamLogoAndNameContainer}>
            <Image source={{ uri: data.homeLogoImage }} style={styles.icon} resizeMode="contain" />
            <Text style={styles.teamNamesText}>{data.homeName}</Text>
          </View>
          {chartDataHome?.bars && chartDataHome?.bars.length > 0 ? (
            <BarChart
              data={chartDataHome.bars.map((item: any) => {
                return {
                  label: item.againstName,
                  value:
                    item.value === 'W' || item.value === 'L'
                      ? item.value === 'W'
                        ? 1
                        : 0
                      : item.value
                };
              })}
              width={containerWidth / 2 - 20}
              height={150}
              barColor="#F8696B"
              meanValue={
                chartDataHome.bars[0].value === 'W' || chartDataHome.bars[0].value === 'L'
                  ? 0.5
                  : chartDataHome.statsPoint
              }
              showWinOrLose={
                chartDataHome.bars[0].value === 'W' || chartDataHome.bars[0].value === 'L'
                  ? true
                  : false
              }
            />
          ) : (
            <View style={{ height: 150, width: containerWidth / 2 - 20, marginTop: 20 }} />
          )}
        </View>
      </View>
    </View>
  );
};

export default GameExtraData;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsSelectContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  statsContainer: {
    paddingHorizontal: 12,
    marginHorizontal: 2,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statText: {
    fontSize: 12
  },
  headingText: {
    fontSize: 14,
    fontWeight: '600',
    color: variables.colors.white
  },
  teamNamesText: {
    fontSize: 12,
    fontWeight: '400',
    color: variables.colors.white
  },
  icon: {
    width: 24,
    height: 24
  },
  chartsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16
  },
  teamLogoAndNameContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
});
