import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationProp, TabNavigationState } from '@react-navigation/native';
import { Icon } from '~/components/icon/icon';
import { variables } from '~/utils/mixins';

interface CustomTabBarProps {
  state: TabNavigationState<any>;
  navigation: NavigationProp<any>;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, navigation }) => {
  const getIcons = (routeName: string, isFocused: boolean) => {
    switch (routeName) {
      case 'Leaderboard':
        return isFocused ? 'leaderboardMenuIconActive' : 'leaderboardMenuIcon';
      case 'Game Props':
        return isFocused ? 'gamePropsActive' : 'gameProps';
      case 'Player Props':
        return isFocused ? 'playerPropsActive' : 'playerProps';
      case 'Live Games':
        return isFocused ? 'liveGamesActive' : 'liveGames';
      case 'Account':
        return isFocused ? 'accountActive' : 'account';
    }
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = index === state.index;

        const handlePress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity key={route.name} onPress={handlePress} style={styles.tabItem}>
            <Icon icon={getIcons(route.name, isFocused)} />
            <Text style={isFocused ? styles.focusedLabel : styles.label}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    borderRadius: 35,
    height: 58,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 25,
    paddingHorizontal: 15
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    marginTop: 10
  },
  label: {
    fontSize: 8,
    color: variables.colors.white,
    marginTop: 5
  },
  focusedLabel: {
    fontSize: 8,
    color: variables.colors.white,
    marginTop: 5
  }
});

export default CustomTabBar;
