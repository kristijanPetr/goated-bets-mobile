import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { variables } from '~/utils/mixins';
import FullScreenModal from '../common/FullScreenModal';
import InfoModal from '../modals/InfoModal';

interface Props {
  selectedStat: string;
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
}

const GamePropsDisplayStats = ({ selectedStat, setSelectedStat }: Props) => {
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

  const handleSelectStat = (id: string) => {
    return setSelectedStat(id);
  };

  const stats = [
    { id: '1', name: 'L5' },
    { id: '2', name: 'L10' },
    { id: '3', name: 'L25' },
    { id: '4', name: 'Seasson' },
    { id: '5', name: 'H2H' },
    { id: '6', name: 'Streak' },
    { id: '7', name: 'EV' },
    { id: '8', name: 'Match Grade' }
  ];

  const renderItem = ({ item }: any) => {
    const isSelectedState = selectedStat.includes(item.name);

    const backgroundColor = isSelectedState
      ? { backgroundColor: variables.colors.activeGrey }
      : { backgroundColor: variables.colors.grey };

    const textColor = isSelectedState
      ? { color: variables.colors.black }
      : { color: variables.colors.white };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleSelectStat(item.name)}
        style={{ ...styles.statOptionContainer, ...backgroundColor }}>
        <Text style={{ ...styles.statsText, ...textColor }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FullScreenModal visible={openInfoModal}>
        <InfoModal toggleModal={() => setOpenInfoModal(false)} />
      </FullScreenModal>
      <View style={styles.statContainer}>
        <View style={styles.statTextContainer}>
          <Text style={styles.displayText}>Display</Text>
          <Text style={styles.displayText}>Stat:</Text>
        </View>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setOpenInfoModal(true)}>
          <AntDesign name="infocirlce" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={stats}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GamePropsDisplayStats;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row'
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  statTextContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayText: {
    fontSize: 12,
    fontWeight: '600',
    color: variables.colors.white
  },
  statOptionContainer: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,

    borderRadius: 20,
    marginRight: 4
  },
  statsText: {
    fontSize: 12
  }
});
