import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { variables } from '~/utils/mixins';
import { Icon } from '../icon/icon';
import BackButton from '../common/BackButton';
import betSmarter from '../../images/betSmarterBackground.png';
import shareBets from '../../images/shareBetsBackground.png';
import trackBetter from '../../images/trackBetterBackground.png';
import topShadow from '../../images/topShadow.png';
import SyncSportsbooks from './SyncSportsbooks';

interface Props {
  back: () => void;
}
const Onboarding = ({ back }: Props) => {
  const [step, setStep] = useState<number>(1);

  const freeTrialTextData = [
    {
      heading: 'Customize Game Stats to Your Needs',
      text: 'Choose data points that you like to see + sort and filter to find the best bets.'
    },
    {
      heading: 'Send Unlimited Bets to Sportsbooks',
      text: 'Send single bets and parlays to FanDuel, DraftKings, BetMGM, Ceasers with the click of one button.'
    },
    {
      heading: 'View Live Game Scores and Plays',
      text: 'See live scoring plays and box score for live games.'
    },
    {
      heading: 'Track Progress and Predictions on Bets',
      text: 'See how straight bets and legs are progressing through the game + projections for outcomes in the game.'
    }
  ];

  const renderHeadingText = () => {
    const icon =
      step === 1
        ? 'betSmarterWords'
        : step === 2
          ? 'trackBetsWords'
          : step === 3
            ? 'shareBetsWords'
            : 'goPremiumWords';
    return <Icon icon={icon} />;
  };

  const renderSubheaderText = () => {
    const text =
      step === 1
        ? `Evaluate data before \n placing a bet ...`
        : step === 2
          ? '... track progress of your \n bets live ...'
          : '... and share winning (or \n losing) bets with friends!';
    if (step === 4) return null;
    return <Text style={styles.subheadeingText}>{text}</Text>;
  };

  const renderImage = () => {
    const image = step === 1 ? betSmarter : step === 2 ? trackBetter : shareBets;
    if (step === 4) return null;
    return (
      <>
        <Image
          source={topShadow}
          style={{ position: 'absolute', top: 180, left: 0, height: 360 }}
        />
        <Image
          source={image}
          style={{ width: '120%', height: '85%', zIndex: -1, marginTop: 20 }}
          resizeMode="cover"
        />
        <Image
          source={topShadow}
          style={{
            position: 'absolute',
            bottom: -60,
            left: 0,
            height: 360,
            transform: [{ rotate: '180deg' }]
          }}
        />
      </>
    );
  };

  const renderFreeTrialDescription = () => {
    if (step !== 4) return null;
    return (
      <View style={styles.freeTrial}>
        <Text style={styles.freeTialHeading}>7 day free trial</Text>
        <View style={{ width: '65%' }}>
          {freeTrialTextData.map((item: { heading: string; text: string }, index: number) => {
            return (
              <View key={index} style={styles.listFreeTrial}>
                <Icon icon={'yellowCheckmarkCircle'} style={{ marginRight: 8, marginTop: -6 }} />
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.listFreeTrialHeading}>{item.heading}</Text>
                  <Text style={styles.listFreeTrialText}>{item.text}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  if (step === 5) {
    return <SyncSportsbooks back={() => setStep(4)} />;
  }

  return (
    <View style={styles.container}>
      <BackButton
        back={() => {
          if (step === 1) {
            return back();
          } else {
            return setStep((prevState) => prevState - 1);
          }
        }}
        containerPosition={{ top: 90, left: 30 }}
      />
      {renderHeadingText()}
      {renderSubheaderText()}
      {renderImage()}
      {renderFreeTrialDescription()}
      <TouchableOpacity onPress={() => setStep((prevState) => prevState + 1)} style={styles.button}>
        {step === 4 ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.buttonText}>Continue</Text>
            <Text style={{ ...styles.buttonText, fontSize: 10, textTransform: 'none' }}>
              Try free for 7 days, then $17.99/month
            </Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: variables.colors.black,
    alignItems: 'center',
    paddingTop: 140
  },
  subheadeingText: {
    color: variables.colors.onboardingText,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    zIndex: 1
  },
  button: {
    backgroundColor: variables.colors.blue,
    width: '80%',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 40
  },
  buttonText: {
    color: variables.colors.white,
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600'
  },
  freeTrial: {
    marginTop: 20,
    alignItems: 'center'
  },
  freeTialHeading: {
    color: variables.colors.headerYellow,
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20
  },
  listFreeTrial: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  listFreeTrialHeading: { fontSize: 14, color: variables.colors.white, fontWeight: '600' },
  listFreeTrialText: { fontSize: 10, color: variables.colors.white }
});
