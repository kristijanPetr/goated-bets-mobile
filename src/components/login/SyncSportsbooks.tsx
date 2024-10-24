import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import BackButton from '../common/BackButton';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  back: () => void;
}

const SyncSportsbooks = ({ back }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  return (
    <View style={styles.container}>
      <BackButton back={back} containerPosition={{ top: 90, left: 30 }} />
      <Text style={styles.header}>Sync with Sportsbooks</Text>
      <Text style={styles.subHeader}>Link your account to your Sportsbook</Text>
      <Icon icon={'fanDuelSyncLogo'} />
      <Icon icon={'draftKingsSyncLogo'} />
      <Text style={{ ...styles.header, fontSize: 14, marginBottom: 40 }}>... more to come!</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Sync</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, marginTop: 20, backgroundColor: variables.colors.black }}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ position: 'absolute', top: 20, right: 20 }}>
            <AntDesign
              name="closecircle"
              size={24}
              color={variables.colors.closeButtonBackground}
            />
          </TouchableOpacity>
          <Text style={styles.modalHeading}>BetSync</Text>
          <Text style={styles.modalText}>Select your account</Text>
          <View style={styles.searchFilterContainer}>
            <Feather name="search" size={16} color="black" />
            <TextInput
              style={{ marginLeft: 4 }}
              placeholder="Search by name or state"
              value={searchFilter}
              onChangeText={setSearchFilter}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: variables.colors.white,
              position: 'absolute',
              bottom: 30
            }}
            onPress={() => setModalVisible(false)}>
            <Text style={{ ...styles.buttonText, color: variables.colors.black }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SyncSportsbooks;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: variables.colors.black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    color: variables.colors.white,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subHeader: {
    fontSize: 20,
    color: variables.colors.loginTextGrey,
    marginBottom: 26
  },
  button: {
    backgroundColor: variables.colors.blue,
    width: '80%',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: variables.colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    width: '100%',
    alignItems: 'center'
  },
  modalHeading: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  modalText: {
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'left',
    width: '100%'
  },
  searchFilterContainer: {
    backgroundColor: variables.colors.inputBackground,
    width: '100%',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: variables.colors.black
  }
});
