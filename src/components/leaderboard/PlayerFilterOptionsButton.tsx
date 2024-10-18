import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';

interface Props {
  value: { id: string; type: string };
  type: string;
  onChange: () => void;
  label: string;
  containerStyle?: any;
}
const PlayerFilterOptionsButton = ({ value, type, onChange, label, containerStyle }: Props) => {
  const isSelected = value.id === type;
  const upOrDownIcon = value.type === 'asc' ? 'caretdown' : 'caretup';
  return (
    <TouchableOpacity
      onPress={onChange}
      style={{ ...styles.container, ...containerStyle }}
      activeOpacity={0.8}>
      <Text style={styles.textLegend}>{label}</Text>
      {isSelected ? (
        <AntDesign name={upOrDownIcon} size={12} color="white" />
      ) : (
        <Icon icon={'emptyFilterArrow'} style={{ marginVertical: 2.5 }} />
      )}
    </TouchableOpacity>
  );
};

export default PlayerFilterOptionsButton;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  textLegend: {
    fontSize: 10,
    color: variables.colors.white
  }
});
