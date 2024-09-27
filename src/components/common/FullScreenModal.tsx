import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

const FullScreenModal = ({ children, visible }: Props) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FullScreenModal;
