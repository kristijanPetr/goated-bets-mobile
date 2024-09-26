import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { variables } from '~/utils/mixins';
import { LinearGradient } from 'expo-linear-gradient';

const LiveGames = () => {
  return (
    <LinearGradient
      colors={[variables.colors.backgroundLinearDark, variables.colors.backgroundLinearBright]}
      start={{ x: 0.8, y: 0.8 }}
      end={{ x: 1, y: 1 }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
      }}>
      <View style={styles.container}>
        <Text>LiveGames</Text>
      </View>
    </LinearGradient>
  );
};

export default LiveGames;

const styles = StyleSheet.create({
  container: { flex: 1 }
});
