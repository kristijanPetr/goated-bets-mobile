import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

interface LoginProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import toolkit from 'jsen-cls-sdk-prj-packagejs-mod-toolkit-pkg-interface-for-sdk-ecmascript';

import singleton from '../utils/singelton';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { useNavigation } from '@react-navigation/native';
import { variables } from '~/utils/mixins';
import OverlayLoader from '~/components/common/OverlayLoader';
//kristijan@localhost
//test'
const Login = (props: LoginProps) => {
  const { initiateData } = React.useContext(SingletonDataContextProvider);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation() as any;

  const onChangeText = (value: string, key: string) => {
    if (key === 'username') {
      return setUsername(value);
    } else if (key === 'password') {
      return setPassword(value);
    }
  };

  const handleLogIn = async () => {
    setIsLoading(true);
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

    await dom.ma_init().then(async () => {
      const loginForm = navigator.dom.root.lists['identitydb.identities'].actions['POST:/login'];
      loginForm.ms_reset();

      loginForm.fields['kJAlias[email]'].value = username;
      loginForm.fields['password'].value = password;

      let isLoggedIn = false;

      await loginForm
        .ma_submit()
        .then((res: any) => {
          console.log(res, 'see this');
          isLoggedIn = true;
        })
        .catch((error: any) => {
          console.log('error', error);
        });

      // FIXME: resubmit token on relog
      // navigator.dom.ms_set_authorization('savedToken');
      if (isLoggedIn) {
        navigator.dom.ms_set_authorization('');
        await singleton.ma_reboot(toolkit, null, navigator, null, {}, 'mlb').catch((error) => {
          console.log('error', error);
        });
        initiateData(singleton.data);
        setIsLoading(false);
        return navigation.navigate('TabNavigator');
      } else {
        setIsLoading(false);
        return null;
      }
    });
  };

  if (isLoading) {
    return <OverlayLoader isLoading={isLoading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeader}>Enter your information to sign in</Text>
      <TextInput
        style={{ ...styles.textInput, marginBottom: 12 }}
        onChangeText={(value) => onChangeText(value, 'username')}
        value={username}
        placeholder="Username or email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => onChangeText(value, 'password')}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
      </View>
      <TouchableOpacity onPress={() => handleLogIn()}>
        <View style={styles.logInButton}>
          <Text style={styles.logInText}>Log in</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: variables.colors.loginBackgroundColor
  },
  loginHeader: {
    color: '#F8696B',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 80
  },
  textInput: {
    width: 300,
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: variables.colors.white,
    color: variables.colors.black
  },
  forgotPasswordContainer: {
    width: 300,
    marginTop: 6,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  forgotPasswordText: {
    color: '#F8696B',
    fontSize: 16,
    fontWeight: '600'
  },
  logInButton: {
    width: 300,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  logInText: {
    color: variables.colors.white,
    fontSize: 18,
    fontWeight: '600'
  }
});
