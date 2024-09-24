import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Icon } from '../icon/icon';

const DATA = [
  { id: '1', name: 'Anytime', metric: 'TD' },
  { id: '2', name: 'Passing', metric: 'Yds' },
  { id: '3', name: 'Rushing', metric: 'Yds' },
  { id: '4', name: 'Rec1', metric: 'Yds' },
  { id: '5', name: 'Rec2', metric: 'Yds' },
  { id: '6', name: 'Rec3', metric: 'Yds' },
  { id: '7', name: 'Rec4', metric: 'Yds' }
];
const StatsSelectorAndFilter = () => {
  const [statsSelected, setStatsSelected] = useState<string[]>([]);
  const [isSearchFilterSelected, setIsSearchFilterSelected] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const handleStatSelect = (selectOption: string) => {
    if (statsSelected.includes(selectOption)) {
      setStatsSelected((prevState) => prevState.filter((item) => item !== selectOption));
    } else {
      setStatsSelected((prevState) => [...prevState, selectOption]);
    }
  };
  const renderItem = (item: any) => {
    const isItemActive = statsSelected.includes(item.name);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={item.id}
        onPress={() => handleStatSelect(item.name)}
        style={{
          ...styles.statsContainer,
          backgroundColor: isItemActive ? variables.colors.activeGrey : variables.colors.grey
        }}>
        <Text
          style={{
            ...styles.statsText,
            color: isItemActive ? variables.colors.black : variables.colors.white
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            ...styles.statsText,
            color: isItemActive ? variables.colors.black : variables.colors.white
          }}>
          {item.metric}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isSearchFilterSelected) {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchFilterContainer}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            style={{ marginLeft: 4 }}
            placeholder="Type player or prop to search..."
            value={searchFilter}
            onChangeText={setSearchFilter}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.closeSearchFilterButton}
            onPress={() => setIsSearchFilterSelected(false)}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Icon icon="filter" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DATA.map((item) => {
            return renderItem(item);
          })}
        </ScrollView>
      </View>
      <View style={styles.verticalDivider} />
      <View style={styles.filterButtons}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsSearchFilterSelected(!isSearchFilterSelected)}
          style={{ ...styles.buttonContainer, backgroundColor: variables.colors.white }}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Icon icon="filter" />
        </View>
      </View>
    </View>
  );
};

export default StatsSelectorAndFilter;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 15
  },
  horizontalContainer: { width: '70%', flex: 1 },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 15
  },
  flatListContentContainer: {
    width: '80%',
    overflow: 'hidden'
  },
  statsContainer: {
    width: 66,
    height: 40,
    borderRadius: 30,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statsText: {
    fontSize: 11
  },
  verticalDivider: {
    width: 1,
    backgroundColor: variables.colors.white,
    height: 40
  },
  filterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    marginLeft: 4
  },
  buttonContainer: {
    borderRadius: 30,
    backgroundColor: variables.colors.grey,
    borderWidth: 1,
    borderColor: variables.colors.white,
    width: 53,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },
  searchFilterContainer: {
    backgroundColor: variables.colors.white,
    width: '84.8%',
    borderRadius: 30,
    alignItems: 'center',
    paddingLeft: 12,
    flexDirection: 'row'
  },
  closeSearchFilterButton: {
    position: 'absolute',
    right: 14,
    top: 7
  }
});
