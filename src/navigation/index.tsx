import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './tab-navigator';
import { LinearGradient } from 'expo-linear-gradient';
import { variables } from '~/utils/mixins';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const mainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
};

export default function RootStack() {
  return (
    <LinearGradient
      colors={[variables.colors.backgroundLinearDark, variables.colors.backgroundLinearBright]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
      }}>
      <NavigationContainer theme={mainTheme}>
        <Stack.Navigator
          initialRouteName="TabNavigator"
          screenOptions={{ headerTransparent: true }}>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
}
