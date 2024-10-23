import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import GoatedBets from './GoatedBets';
import { variables } from '~/utils/mixins';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BackButton from '../common/BackButton';
import PhoneSignUp from './PhoneSignUp';
import BackgroundImage from '../common/BackgroundImage';
import backgroundLoginBlackAndWhite from '../../images/backgroundLoginBlackAndWhite.png';

interface Props {
  back: () => void;
}

const SignUpOptions = ({ back }: Props) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [signUpSelected, setSignUpSelected] = useState<string>('');

  if (signUpSelected === 'phone') {
    return <PhoneSignUp back={() => setSignUpSelected('')} />;
  }

  return (
    <BackgroundImage image={backgroundLoginBlackAndWhite}>
      <View
        style={styles.container}
        onLayout={(event) => setScreenWidth(event.nativeEvent.layout.width)}>
        <BackButton back={back} containerPosition={{ top: -30, left: 0 }} />
        <GoatedBets />
        <Text style={styles.text}>
          {`Make smarter bets with data, track all your \n bets and share with friends!`}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => setSignUpSelected('phone')}
            style={{
              ...styles.buttonBox,
              width: screenWidth - 40,
              backgroundColor: variables.colors.blue
            }}>
            <FontAwesome
              name="phone"
              size={24}
              color={variables.colors.white}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Sign Up with Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.buttonBox,
              width: screenWidth - 40,
              backgroundColor: variables.colors.loginButtonGrey
            }}>
            <FontAwesome
              name="apple"
              size={24}
              color={variables.colors.white}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Sign Up with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.buttonBox,
              width: screenWidth - 40,
              backgroundColor: variables.colors.loginButtonGrey
            }}>
            <FontAwesome
              name="google"
              size={24}
              color={variables.colors.white}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Sign Up with Google</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.confirmText}>
            By continuing, you agree to our <Text style={styles.boldConfirmText}>Terms of Use</Text>
          </Text>
        </View>
      </View>
    </BackgroundImage>
  );
};

export default SignUpOptions;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  text: {
    fontSize: 16,
    color: variables.colors.white,
    textAlign: 'center',
    marginBottom: 20
  },
  buttonBox: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: variables.colors.white,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: variables.colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  confirmText: {
    color: variables.colors.loginTextGrey,
    fontSize: 10
  },
  boldConfirmText: {
    fontWeight: 'bold',
    color: variables.colors.white
  },
  icon: { marginRight: 10 }
});
