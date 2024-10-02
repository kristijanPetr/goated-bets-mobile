import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { variables } from '~/utils/mixins';
import Dropdown from './Dropdown';
import { IconTypes } from '../icon/icons';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';

interface Props {
  title: string;
}

const ScreenHeader = ({ title }: Props) => {
  const { data } = useContext(SingletonDataContextProvider);

  const dataOptions = [
    { icon: 'fanDuel' as IconTypes, name: 'Fan Duel' },
    { icon: 'draftKingsLogo' as IconTypes, name: 'DraftKings' }
  ];

  const dataSportsOptions = Object.keys(data.carouselSport).map((key) => {
    return { icon: key.toLocaleUpperCase() as IconTypes, name: key.toLocaleUpperCase() };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.dropdownButtonContainer}>
        <View style={{ ...styles.dropdownButton, marginRight: 6 }}>
          <Dropdown
            options={dataOptions}
            customMainContainer={{ width: 35 }}
            customItemContainer={{ width: 150 }}
          />
        </View>
        <View style={styles.dropdownButton}>
          <Dropdown
            options={dataSportsOptions}
            customMainContainer={{ width: 60 }}
            customItemContainer={{ width: 110 }}
            includeName
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
