import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { variables } from '~/utils/mixins';
import BackButton from '../common/BackButton';
import Onboarding from './Onboarding';

interface Props {
  back: () => void;
}

const PhoneSignUp = ({ back }: Props) => {
  const [step, setStep] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>(Array(6).fill(''));

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;

    if (text && index < 5) {
      // Move to the next input box
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 50);
    }

    setCode(newCode);
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !code[index]) {
      // Move to the previous input box
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 50);
    }
  };
  const renderActionCircles = () => {
    return (
      <View style={styles.circleContainer}>
        <View
          style={{
            ...styles.circle,
            backgroundColor: variables.colors.statsYellow
          }}
        />
        <View
          style={{
            ...styles.circle,
            backgroundColor: step === 2 ? variables.colors.statsYellow : variables.colors.white
          }}
        />
      </View>
    );
  };

  const renderInputs = () => {
    if (step === 1) {
      return (
        <TextInput
          placeholder=""
          placeholderTextColor={variables.colors.white}
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      );
    }
    return (
      <>
        <View style={styles.verificationContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={styles.verificationInput}
              keyboardType="phone-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              onFocus={() => code.map((c, i) => (i === index ? c : ''))}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.resendCode}>Resend Code</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderTextMessage = () => {
    if (step === 1) {
      return <Text style={styles.text}>Enter your phone number</Text>;
    }
    return (
      <>
        <Text style={{ ...styles.text, marginBottom: 0 }}>{`Enter the verification code \n`} </Text>
        <Text style={styles.codeSendToText}>Your code was sent to {phoneNumber}</Text>
      </>
    );
  };
  if (step === 3) {
    return <Onboarding back={() => setStep(2)} />;
  }

  return (
    <View style={styles.container}>
      <BackButton
        back={() => (step === 1 ? back() : setStep(1))}
        containerPosition={{ top: 90, left: 30 }}
      />
      {renderActionCircles()}
      {renderTextMessage()}
      {renderInputs()}
      <TouchableOpacity
        onPress={() => {
          if (step === 2) {
            setStep(3);
          } else {
            setStep(2);
          }
        }}
        style={{ ...styles.button, marginTop: step === 1 ? 120 : 90 }}>
        <Text style={styles.buttonText}>{step === 1 ? 'Continue' : 'Verify'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneSignUp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: variables.colors.black,
    alignItems: 'center'
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 140,
    marginTop: 200
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: variables.colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: variables.colors.white,
    marginHorizontal: 8
  },
  textInput: {
    width: '85%',
    height: 50,
    borderRadius: 10,
    backgroundColor: variables.colors.white,
    color: variables.colors.black,
    paddingHorizontal: 12
  },
  text: {
    color: variables.colors.white,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 60
  },
  button: {
    width: '85%',
    backgroundColor: variables.colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 20
  },
  buttonText: {
    color: variables.colors.white,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  verificationContainer: {
    flexDirection: 'row'
  },
  verificationInput: {
    backgroundColor: variables.colors.white,
    width: '12%',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 18,
    color: variables.colors.black
  },
  resendCode: {
    color: variables.colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10
  },
  codeSendToText: {
    color: variables.colors.loginTextGrey,
    marginBottom: 40,
    marginTop: -20
  }
});
