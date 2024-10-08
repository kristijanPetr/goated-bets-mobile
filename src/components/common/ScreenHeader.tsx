import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { variables } from '~/utils/mixins';
import Dropdown from './Dropdown';
import { IconTypes } from '../icon/icons';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

interface Props {
  title: string;
}

const ScreenHeader = ({ title }: Props) => {
  const { data, refetchData } = useContext(SingletonDataContextProvider);
  const [selectedSport, setSelectedSport] = useState(data?.sport || 'nba');
  const [selectedBookmaker, setSelectedBookmaker] = useState(data?.bookmaker || 'fan Duel');

  const handleDropdownChange = (value: string, key: string) => {
    if (key === 'sport') {
      refetchData(value, selectedBookmaker);
      return setSelectedSport(value);
    } else if (key === 'bookmaker') {
      refetchData(selectedSport, value);
      return setSelectedBookmaker(value);
    }
  };

  const dataOptions = [
    { icon: 'fanDuel' as IconTypes, name: 'Fan Duel' },
    { icon: 'draftKingsLogo' as IconTypes, name: 'DraftKings' }
  ];

  const sportsOptions = [
    { icon: 'NFL' as IconTypes, name: 'nfl' },
    { icon: 'MLB' as IconTypes, name: 'mlb' },
    { icon: 'NBA' as IconTypes, name: 'nba' },
    { icon: 'NHL' as IconTypes, name: 'nhl' },
    { icon: 'WNBA' as IconTypes, name: 'wnba' }
  ];

  const dataSportsOptions = data?.carouselSport
    ? Object.keys(data.carouselSport).map((key) => {
        return { icon: key.toLocaleUpperCase() as IconTypes, name: key };
      })
    : sportsOptions;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.dropdownButtonContainer}>
        <View style={{ ...styles.dropdownButton, marginRight: 6 }}>
          <Dropdown
            value={selectedBookmaker}
            handleDropdownChange={(value) => handleDropdownChange(value, 'bookmaker')}
            options={dataOptions}
            customMainContainer={{ width: 35 }}
            customItemContainer={{ width: 150 }}
          />
        </View>
        <View style={styles.dropdownButton}>
          <Dropdown
            value={selectedSport}
            handleDropdownChange={(value) => handleDropdownChange(value, 'sport')}
            options={dataSportsOptions}
            customMainContainer={{ width: 60 }}
            customItemContainer={{ width: 85 }}
            includeName
            useUppercaseName
          />
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    marginBottom: 10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: variables.colors.headerYellow
  },
  dropdownButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 4
  },
  dropdownButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: variables.colors.white,
    borderRadius: 20,
    backgroundColor: variables.colors.grey
  }
});
