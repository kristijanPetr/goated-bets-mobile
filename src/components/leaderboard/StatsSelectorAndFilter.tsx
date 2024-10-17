import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { variables } from '~/utils/mixins';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Icon } from '../icon/icon';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

interface Props {
  statsSelected: string[];
  searchFilter: string;
  handleStatSelect: (item: string) => void;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
}
const StatsSelectorAndFilter = ({
  statsSelected,
  searchFilter,
  handleStatSelect,
  setSearchFilter
}: Props) => {
  const { data } = useContext(SingletonDataContextProvider);

  const [isSearchFilterSelected, setIsSearchFilterSelected] = useState<boolean>(false);

  const filterMarketsTitles: string[] = data?.mapMarketsToAttributes?.[data?.sport] || [];

  const renderItem = (item: string) => {
    const isItemActive = statsSelected.includes(item);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={item}
        onPress={() => handleStatSelect(item)}
        style={{
          ...styles.statsContainer,
          backgroundColor: isItemActive ? variables.colors.activeGrey : variables.colors.grey
        }}>
        <Text
          style={{
            ...styles.statsText,
            color: isItemActive ? variables.colors.black : variables.colors.white
          }}>
          {data?.mapMarketsToTitles?.[data?.sport]?.[item]}
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
            onPress={() => {
              setIsSearchFilterSelected(false);
              setSearchFilter('');
            }}>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ width: '97%' }}>
          {Object.values(filterMarketsTitles).map((item) => {
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
    width: 70,
    height: 40,
    borderRadius: 30,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statsText: {
    width: 55,
    textAlign: 'center',
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
