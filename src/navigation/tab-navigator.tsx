import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import { variables } from '~/utils/mixins';
import { Icon } from '~/components/icon/icon';
import Leaderboard from '~/screens/Leaderboard';
import LiveGames from '~/screens/LiveGames';
import GameProps from '~/screens/GameProps';
import Account from '~/screens/Account';
import PlayerProps from '~/screens/PlayerProps';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Game Props" component={GameProps} />
      <Tab.Screen name="Player Props" component={PlayerProps} />
      <Tab.Screen name="Live Games" component={LiveGames} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
