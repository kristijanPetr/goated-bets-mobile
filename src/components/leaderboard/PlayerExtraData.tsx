import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import dummyChartImage from './dummyChartImage.png';
import dummyBarImage from './dummyBarImage.png';
import { variables } from '~/utils/mixins';

interface Props {
  item: any;
}

const PlayerExtraData = ({ item }: Props) => {
  return (
    <View style={styles.extraDataContainer}>
      <View style={styles.divider} />
      <Image source={dummyChartImage} style={styles.dummyImage} resizeMode="contain" />
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
