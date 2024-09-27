import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { variables } from '~/utils/mixins';

interface Props {
  options: string[];
  selectedIndex: number;
  handleSelection: (id: number) => void;
}

const SlidingSelector = ({ options, selectedIndex, handleSelection }: Props) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const handleSelect = (index: number) => {
    handleSelection(index);
    Animated.spring(translateX, {
      toValue: index * (400 / options.length),
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <Animated.View style={[styles.indicator, { transform: [{ translateX }] }]} />
        {options.map((option, index) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={index}
            style={styles.option}
            onPress={() => handleSelect(index)}>
            <Text
              style={{
                ...styles.optionText,
                color: selectedIndex === index ? variables.colors.black : variables.colors.white
              }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  selectorContainer: {
    flexDirection: 'row',
    width: 400,
    height: 40,
    backgroundColor: variables.colors.lightGrey,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative'
  },
  indicator: {
    position: 'absolute',
    width: '33.33%',
    height: '100%',
    backgroundColor: variables.colors.headerYellow,
    borderRadius: 25
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: {
    color: '#fff',
    fontSize: 12
  }
});

export default SlidingSelector;
