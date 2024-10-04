import React, { useContext, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { variables } from '~/utils/mixins';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { MatchReviewScrollerSkeleton } from '../skeletons/MatchReviewScrollerSkeleton';

const MatchReviewScroller = () => {
  const { data, isFetching } = useContext(SingletonDataContextProvider);
  const [selectedGames, setSelectedGames] = useState<number[]>([]);

  if (isFetching) {
    return (
      <View style={{ ...styles.container, marginBottom: 9 }}>
        <MatchReviewScrollerSkeleton />
      </View>
    );
  }
  const matchData = data?.tickers || [];

  const handleSelectGame = (id: number) => {
    if (selectedGames.includes(id)) {
      setSelectedGames((prevState) => prevState.filter((item) => item !== id));
    } else {
      setSelectedGames((prevState) => [...prevState, id]);
    }
  };

  const renderItem = ({ item, index }: any) => {
    const isItemActive = selectedGames.includes(index);

    const textColor = isItemActive ? variables.colors.black : variables.colors.white;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleSelectGame(index)}
        style={{
          ...styles.item,
          backgroundColor: isItemActive ? variables.colors.activeGrey : variables.colors.grey
        }}>
        <View style={styles.itemTeamContainer}>
          <View style={styles.iconAndNameContainer}>
            <View style={styles.demoIcon}>
              <Image source={{ uri: item.homeLogoImage }} style={{ width: 34, height: 34 }} />
            </View>
            <Text
              style={{
                ...styles.teamName,
                color: textColor
              }}>
              {item.homeName.substring(0, 3)}
            </Text>
          </View>
          <Text style={{ ...styles.teamName, color: textColor }}>Vs</Text>
          <View style={styles.iconAndNameContainer}>
            <View style={styles.demoIcon}>
              <Image source={{ uri: item.awayLogoImage }} style={{ width: 34, height: 34 }} />
            </View>
            <Text style={{ ...styles.teamName, color: textColor }}>
              {item.awayName.substring(0, 3)}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={{ ...styles.time, color: textColor }}>{item.startTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (matchData.length === 0) {
    return (
      <View style={styles.noMatchesContainer}>
        <Text style={styles.noMatchesText}>No matches today</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={matchData}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index.toString()}${item.sport}`}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default MatchReviewScroller;

const styles = StyleSheet.create({
  container: { marginLeft: 6, height: 76, marginBottom: 10, width: '94%' },
  item: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    width: 137,
    height: 76,
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  },
  divider: {
    backgroundColor: variables.colors.white,
    width: '100%',
    height: 0.25
  },
  itemTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80%',
    width: '90%'
  },
  teamName: {
    fontSize: 12,
    marginTop: 4
  },
  demoIcon: {
    height: 30,
    width: 30,
    borderRadius: 20
  },
  iconAndNameContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  time: {
    fontSize: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  dummyImage: {
    height: 35,
    width: 35
  },
  noMatchesContainer: {
    marginLeft: 6,
    height: 76,
    marginBottom: 10,
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noMatchesText: {
    color: variables.colors.white,
    fontSize: 14,
    fontWeight: '600'
  }
});
