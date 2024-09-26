import 'react-native-gesture-handler';

import { ThemeProvider } from '@shopify/restyle';
import { theme } from '~/theme';

import RootStack from '~/navigation';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <RootStack />
    </ThemeProvider>
  );
}
