import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { variables } from '~/utils/mixins';
import Dropdown from './Dropdown';
import { IconTypes } from '../icon/icons';

interface Props {
  title: string;
}

const ScreenHeader = ({ title }: Props) => {
  const dataOptions = [
    { icon: 'fanDuel' as IconTypes, name: 'Fan Duel' },
    { icon: 'draftKingsLogo' as IconTypes, name: 'DraftKings' }
  ];

  const sportsOptions = [
    { icon: 'NFL' as IconTypes, name: 'NFL' },
    { icon: 'MLB' as IconTypes, name: 'MLB' },
    { icon: 'NBA' as IconTypes, name: 'NBA' },
    { icon: 'NHL' as IconTypes, name: 'NHL' },
    { icon: 'WNBA' as IconTypes, name: 'WNBA' }
  ];

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
            options={sportsOptions}
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
    marginTop: 70,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    marginBottom: 20
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
