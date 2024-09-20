import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import { variables } from '~/utils/mixins';
import { Icon } from '~/components/icon/icon';
import Leaderboard from '~/screens/Leaderboard';
import GamePlayers from '~/screens/GamePlayers';
import LiveGames from '~/screens/LiveGames';
import Bets from '~/screens/Bets';
import Social from '~/screens/Social';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: variables.colors.black,
          borderRadius: 35,
          overflow: 'hidden',
          bottom: 50,
          height: 58,
          width: '90%',
          left: '5%',
          paddingHorizontal: 15
        },
        tabBarItemStyle: {
          backgroundColor: variables.colors.black,
          height: 40,
          width: 49,
          marginTop: 10
        },
        tabBarLabelStyle: {
          fontSize: 8,
          color: variables.colors.white,
          marginTop: 5
        }
      }}>
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon icon={focused ? 'leaderboardMenuIconActive' : 'leaderboardMenuIcon'} />
          )
        }}
      />
      <Tab.Screen
        name="Game/Players"
        component={GamePlayers}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon icon={focused ? 'gamePlayersActive' : 'gamePlayers'} />
        }}
      />
      <Tab.Screen
        name="Live Games"
        component={LiveGames}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon icon={focused ? 'liveGamesActive' : 'liveGames'} />
        }}
      />
      <Tab.Screen
        name="Bets"
        component={Bets}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon icon={focused ? 'betsActive' : 'bets'} />
        }}
      />
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon icon={focused ? 'social' : 'social'} />
        }}
      />
    </Tab.Navigator>
  );
}
