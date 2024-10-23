import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { useNavigation } from '@react-navigation/native';
import { variables } from '~/utils/mixins';
import OverlayLoader from '~/components/common/OverlayLoader';
import SignUpOptions from '~/components/login/SignUpOptions';

//kristijan@localhost
//test'

interface LoginProps {}
const Login = (props: LoginProps) => {
  const { addData, singleton, navigator, toolkit, dom } = React.useContext(
    SingletonDataContextProvider
  );
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('kristijan@localhost');
  const [password, setPassword] = useState('test');
  const [signUpPressed, setSignUpPressed] = useState(false);
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

    await dom.ma_init().then(async () => {
      const loginForm = navigator.dom.root.lists['identitydb.identities'].actions['POST:/login'];
      loginForm.ms_reset();

      loginForm.fields['kJAlias[email]'].value = username;
      loginForm.fields['password'].value = password;

      let isLoggedIn = false;

      await loginForm
        .ma_submit()
        .then((res: any) => {
          isLoggedIn = true;
        })
        .catch((error: any) => {
          console.log('error', error);
        });

      if (isLoggedIn) {
        // console.log('Auth', navigator.dom.auth);
        singleton.data.updateAllTickers = true;
        // navigator.dom.ms_set_authorization(navigator.dom.auth['=']);
        try {
          await singleton.ma_reboot(
            toolkit,
            null,
            navigator,
            null,
            {},
            'mlb',
            '',
            '',
            '',
            false,
            addData
          );

          // await singleton
          //   .ma_update_tickers_gamelines(toolkit, null, navigator, null, {})
          //   .then((ticker) => console.log('ticker', ticker));
          // await singleton
          //   .ma_update_ticker_lineups(toolkit, null, navigator, null, {}, singleton.data.ticker)
          //   .then((ticker) => console.log('ma_update_ticker_lineups', ticker));

          console.log('singleton.data', singleton.data);

          // console.log('singleton.data', singleton.data);
          addData(singleton.data);
          setIsLoading(false);
          navigation.navigate('TabNavigator');
        } catch (error) {
          console.log('error', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  if (signUpPressed) {
    return <SignUpOptions back={() => setSignUpPressed(false)} />;
  }

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
      <TouchableOpacity onPress={handleLogIn}>
        <View style={{ ...styles.logInButton, backgroundColor: variables.colors.blue }}>
          <Text style={styles.logInText}>Log in</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSignUpPressed(true)}>
        <View style={{ ...styles.logInButton, backgroundColor: variables.colors.loginButtonGrey }}>
          <Text style={styles.logInText}>Sign Up</Text>
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
    alignItems: 'flex-end',
    marginBottom: 100
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  logInText: {
    color: variables.colors.white,
    fontSize: 18,
    fontWeight: '600'
  }
});
