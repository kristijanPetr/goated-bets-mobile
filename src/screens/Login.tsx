import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

interface LoginProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// import toolkit from 'jsen-cls-sdk-prj-packagejs-mod-toolkit-pkg-interface-for-sdk-ecmascript';

// import singleton from '../utils/singelton';
import { SingletonDataContextProvider } from '~/context/singletonDataContext';
import { useNavigation } from '@react-navigation/native';
import { variables } from '~/utils/mixins';
import OverlayLoader from '~/components/common/OverlayLoader';
import OffDefSection from '~/components/OffDefSection';
import MatchupList from '~/components/MatchupList';
import BarChart from '~/components/BarChart';
//kristijan@localhost
//test'

const Login = (props: LoginProps) => {
  const { initiateData, singleton, navigator, toolkit, dom } = React.useContext(
    SingletonDataContextProvider
  );
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('kristijan@localhost');
  const [password, setPassword] = useState('test');
  const navigation = useNavigation() as any;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      console.log('singleton data: ', singleton.data);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const ma_init_ticker_chart_data_for_player = async () => {
    console.log('singleton data: ', singleton.data);
    if (singleton.data.ticker && singleton.data.ticker.lineups[0]) {
      // await singleton
      //   .ma_init_ticker_chart_data_for_player(
      //     toolkit,
      //     null,
      //     navigator,
      //     null,
      //     {},
      //     singleton.data.ticker,
      //     singleton.data.ticker?.lineups[0]
      //   )
      //   .then((tick) => console.log('tick', tick))
      //   .catch((err) => console.log('err', err));
      // await singleton
      //   .ma_update_ticker_lineups(toolkit, null, navigator, null, {}, singleton.data.ticker)
      //   .then((tick) => console.log('tick', tick));
      console.log(
        'ms_generate_stats_for_player',
        singleton.ms_generate_stats_for_player(
          toolkit,
          singleton.data.ticker,
          singleton.data.ticker?.lineups[0],
          true
        )
      );
      console.log('getHitsPerGame', getHitsPerGame(singleton.data.ticker?.lineups[0]));
      // await singleton
      //   .ma_generate_chart_for_team(
      //     toolkit,
      //     null,
      //     navigator,
      //     null,
      //     {},
      //     singleton.data.ticker,
      //     'away',
      //     JSON.parse(singleton.data.chartDefaults)
      //   )
      //   .then((resp) => console.log('ma_generate_chart_for_team', resp));

      // singleton.ms_calc_hitrate(null,null,null,null,null,)
      await singleton
        .ma_generate_chart_for_player(
          toolkit,
          null,
          navigator,
          null,
          {},
          singleton.data.ticker,
          singleton.data.ticker?.lineups[0],
          JSON.parse(singleton.data.chartDefaults)
        )
        .then((resp: any) => console.log('ma_generate_chart_for_player', resp));
    }
  };

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
          await singleton.ma_reboot(toolkit, null, navigator, null, {}, 'mlb');

          // await singleton
          //   .ma_update_tickers_gamelines(toolkit, null, navigator, null, {})
          //   .then((ticker) => console.log('ticker', ticker));
          // await singleton
          //   .ma_update_ticker_lineups(toolkit, null, navigator, null, {}, singleton.data.ticker)
          //   .then((ticker) => console.log('ma_update_ticker_lineups', ticker));

          console.log('singleton.data', singleton.data);

          // console.log('singleton.data', singleton.data);
          initiateData(singleton.data);
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

  function getHitsPerGame(player: any) {
    try {
      // Find the player in the ticker's lineups or performances
      // let player = ticker.lineups.find(player => player.player.id === playerId);

      if (!player) {
        console.log('Player not found in ticker.');
        return;
      }

      // Get the player's performances data
      let performances = player.performances;

      let totalHits = 0;
      let gamesPlayed = 0;

      // Loop through the performances to calculate total hits and games played
      performances.forEach((performance: any) => {
        if (performance.attributes.status['='] === 'final') {
          // Ensure the performance meta contains hits data
          const metaStats = JSON.parse(performance.attributes.meta['=']);
          console.log('metaStats', metaStats);
          let hits = metaStats.batter_hits || 0;
          totalHits += parseInt(hits, 10);
          gamesPlayed += 1;
        }
      });

      if (gamesPlayed === 0) {
        console.log('No games played.');
        return 0;
      }

      // Calculate hits per game
      let hitsPerGame = totalHits / gamesPlayed;

      console.log(`Hits per Game for player `, hitsPerGame);
      return hitsPerGame;
    } catch (e) {
      console.error('Error calculating hits per game:', e);
    }
  }

  // chart generation
  // const getData = async () => {
  //   console.log(singleton.data, 'see data before function');
  //   await singleton
  //     .ma_generate_chart_for_player(
  //       toolkit,
  //       null,
  //       navigator,
  //       null,
  //       {},
  //       singleton.data.ticker,
  //       singleton.data.ticker?.lineups[0],
  //       JSON.parse(singleton.data.chartDefaults),
  //       'batter_hits',
  //       '10def'
  //     )
  //     .then((resp) => console.log('ma_generate_chart_for_player', resp));
  // };

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
        <View style={styles.logInButton}>
          <Text style={styles.logInText}>Log in</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={ma_init_ticker_chart_data_for_player}>
        <View style={styles.logInButton}>
          <Text style={styles.logInText}>get data</Text>
        </View>
      </TouchableOpacity> */}
      {/* <BarChart
        data={[
          { label: 'A', value: 50 },
          { label: 'B', value: 100 },
          { label: 'C', value: 150 },
          { label: 'D', value: 200 },
          { label: 'E', value: 80 }
        ]}
        width={350}
        height={200}
        barColor="#4CAF50"
      /> */}
      {/* <OffDefSection
        mapGamelinesToTitles={singleton.data.mapGamelinesToTitles['mlb']}
        meta={JSON.parse(singleton.data.ticker.matchup.attributes['meta']['='])}
      /> */}
      {/* <MatchupList singleton={singleton.data} ticker={singleton.data.ticker} /> */}
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
