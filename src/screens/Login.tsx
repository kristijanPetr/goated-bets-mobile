import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface LoginProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import toolkit from 'jsen-cls-sdk-prj-packagejs-mod-toolkit-pkg-interface-for-sdk-ecmascript';

import singleton from '../utils/singelton';

const Login = (props: LoginProps) => {
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
    console.log(
      'singleton.data',
      navigator.dom.root.lists['identitydb.identities'].actions['POST:/login']
    );

    const loginForm = navigator.dom.root.lists['identitydb.identities'].actions['POST:/login'];
    loginForm.ms_reset();
    console.log('loginForm.fields', loginForm.fields);
    loginForm.fields['kJAlias[email]'].value = 'kristijan@localhost';
    loginForm.fields['password'].value = 'test';

    await loginForm.ma_submit();

    navigator.dom.ms_set_authorization('');
    await singleton.ma_reboot(toolkit, null, navigator, null, {}, 'mlb').catch((error) => {
      console.log('error', error);
    });
    console.log('Team data', singleton.data);

    // FIXME: resubmit token on relog
    // navigator.dom.ms_set_authorization('savedToken');
  });

  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
