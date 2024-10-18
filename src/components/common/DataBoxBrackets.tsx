import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';

interface Props {
  firstContainerData: string[];
  secondContainerData: string[];
  secondContainerStyle?: any;
  thirdContainerData?: string[];
  thirdContainerStyle?: any;
}

const DataBoxBrackets = ({
  firstContainerData,
  secondContainerData,
  secondContainerStyle,
  thirdContainerData = [],
  thirdContainerStyle
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedItem(!selectedItem)}
        style={{
          ...styles.firstContainer,
          backgroundColor: selectedItem ? variables.colors.white : variables.colors.grey
        }}>
        {firstContainerData.map((item, index) => {
          const hasMoreData = firstContainerData.length > 1;
          return (
            <Text
              key={index}
              style={{
                ...styles.firstContainerText,
                fontWeight: hasMoreData && index === 0 ? 'bold' : 'normal',
                color: selectedItem ? variables.colors.black : variables.colors.white
              }}>
              {item}
            </Text>
          );
        })}
      </TouchableOpacity>
      <View style={{ ...styles.secondContainer, ...secondContainerStyle }}>
        {secondContainerData.map((item, index) => {
          return (
            <Text key={index} style={styles.secondContainerText}>
              {item}
            </Text>
          );
        })}
      </View>
      {thirdContainerData.length > 0 && (
        <View style={{ ...styles.thirdContainer, ...thirdContainerStyle }}>
          {thirdContainerData.map((item, index) => {
            return (
              <Text key={index} style={styles.secondContainerText}>
                {item}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DataBoxBrackets;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30.5%'
  },
  firstContainer: {
    width: '60%',
    height: 36,
    borderColor: variables.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondContainer: {
    width: '50%',
    height: 36,
    borderColor: variables.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: -15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  thirdContainer: {
    width: '50%',
    height: 36,
    borderColor: variables.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: -15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  firstContainerText: {
    fontSize: 10
  },
  secondContainerText: {
    color: variables.colors.black,
    fontSize: 10,
    marginLeft: 15
  }
});
