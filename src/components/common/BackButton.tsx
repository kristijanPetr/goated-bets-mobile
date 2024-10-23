import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { variables } from '~/utils/mixins';

interface Props {
  back: () => void;
  containerPosition: any;
}
const BackButton = ({ back, containerPosition }: Props) => {
  return (
    <TouchableOpacity onPress={back} style={{ ...styles.backButton, ...containerPosition }}>
      <AntDesign name="left" size={10} color={variables.colors.white} />
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonText: {
    color: variables.colors.white,
    marginLeft: 4
  }
});
