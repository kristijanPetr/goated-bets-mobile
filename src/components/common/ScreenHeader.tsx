import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { variables } from '~/utils/mixins';

interface Props {
  title: string;
}

const ScreenHeader = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.dropdownButtonContainer}>
        <View style={{ ...styles.dropdownButton, marginRight: 6 }}>
          <Text style={{ color: variables.colors.white }}>Sport Type</Text>
        </View>
        <View style={styles.dropdownButton}>
          <Text style={{ color: variables.colors.white }}>Page</Text>
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
    color: variables.colors.white
  },
  dropdownButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
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
