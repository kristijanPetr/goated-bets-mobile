import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { variables } from '~/utils/mixins';

interface Props {
  value: boolean;
  onChange: () => void;
  label: string;
  containerStyle?: any;
}
const PlayerFilterOptionsButton = ({ value, onChange, label, containerStyle }: Props) => {
  return (
    <TouchableOpacity
      onPress={onChange}
      style={{ ...styles.container, ...containerStyle }}
      activeOpacity={0.8}>
      <Text style={styles.textLegend}>{label}</Text>
      <AntDesign name={value ? 'caretdown' : 'caretup'} size={12} color="white" />
    </TouchableOpacity>
  );
};

export default PlayerFilterOptionsButton;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  textLegend: {
    fontSize: 12,
    color: variables.colors.white
  }
});
