import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';
import { IconTypes } from '../icon/icons';

import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  options: { icon: IconTypes; name: string }[];
  value: string;
  handleDropdownChange: (value: string) => void;
  customItemContainer: any;
  customMainContainer: any;
  includeName?: boolean;
  useUppercaseName?: boolean;
}
const Dropdown = ({
  options,
  value,
  handleDropdownChange,
  customItemContainer,
  customMainContainer,
  includeName = false,
  useUppercaseName = false
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const selectOption = (option: any) => {
    handleDropdownChange(option.name);
    toggleModal();
  };

  const handleLayout = (event: any) => {
    setButtonLayout(event.nativeEvent.layout);
  };
  const selectedOption = options.find((item) => item.name === value) || options[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggleModal}
        onLayout={handleLayout}
        style={{ flexDirection: 'row', alignItems: 'center', ...customMainContainer }}>
        <Icon icon={selectedOption.icon} style={{ width: 25, height: 25, marginRight: 2 }} />
        {includeName && (
          <Text style={{ ...styles.buttonText, fontWeight: 'bold' }}>
            {useUppercaseName ? selectedOption.name.toLocaleUpperCase() : selectedOption.name}
          </Text>
        )}
        <AntDesign name={'caretdown'} size={8} color="white" />
      </TouchableOpacity>

      {modalVisible && buttonLayout && (
        <View
          style={[
            styles.modalContent,
            { top: buttonLayout?.y + buttonLayout?.height, left: -22 },
            customItemContainer
          ]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectOption(option)}
              style={styles.option}>
              <View
                style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Icon icon={option.icon} style={{ width: 20, height: 20 }} />
              </View>
              <Text style={styles.optionText}>
                {useUppercaseName ? option.name.toLocaleUpperCase() : option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: variables.colors.white,
    borderRadius: 20,
    backgroundColor: variables.colors.grey
  },
  buttonText: {
    color: variables.colors.white,
    fontSize: 12
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    width: 130,
    elevation: 4,
    zIndex: 1
  },
  option: {
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: variables.colors.white,
    borderRadius: 20,
    backgroundColor: variables.colors.grey,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  optionText: {
    fontSize: 12,
    color: variables.colors.white,
    fontWeight: 'bold',
    marginLeft: 10
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16
  }
});

export default Dropdown;
