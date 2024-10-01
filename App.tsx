import 'react-native-gesture-handler';

import { ThemeProvider } from '@shopify/restyle';
import { theme } from '~/theme';

import RootStack from '~/navigation';
import { StatusBar } from 'react-native';
import toolkit from 'jsen-cls-sdk-prj-packagejs-mod-toolkit-pkg-interface-for-sdk-ecmascript';

import singleton from './src/utils/singelton';
import Login from '~/screens/Login';

export default function App() {
  let dom = new toolkit.sdk.dom(
    'widget_worker', // dom name
    'http://137.184.135.111:49992/openapi.json'
  );

  let navigator = new toolkit.sdk.navigator(dom);
  navigator.state = {
    doms: {
      widget_worker: dom
    },
    navigators: {
      widget_worker: navigator
    }
  };

  dom.ma_init().then(async () => {
    console.log('singleton.data', singleton.data);
    // console.log(dom);
    const getTeamsForm = navigator.dom.root.lists['membersdb.teams'].actions['GET'];

    getTeamsForm.ms_reset();
    getTeamsForm.fields['kSLimit'].value = '10';
    getTeamsForm.fields['kJQuery.kSTerm'].value = '';
    getTeamsForm.fields['kSMarker'].value = null;
    await getTeamsForm.ma_resubmit();

    console.log('getTeamsForm', getTeamsForm.fields);
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      {/* <RootStack /> */}
      <Login />
    </ThemeProvider>
  );
}
