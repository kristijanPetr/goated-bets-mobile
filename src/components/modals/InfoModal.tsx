import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { variables } from '~/utils/mixins';

interface Props {
  toggleModal: () => void;
}

const InfoModal = ({ toggleModal }: Props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={toggleModal} style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.heading}>Betting Terms</Text>
        <View style={styles.divider} />
        <View style={styles.rowContainer}>
          <Text style={styles.termText}>L5, L10, Season, Hit Rate</Text>
          <Text style={styles.descriptionText}>
            Percent of times the prop has been covered over the last 5, 10, and full season games.{' '}
            <Text style={styles.boldedText}>A higher number implies a better bet.</Text>
            {'\n'}
            <Text style={styles.hintText}> # of games the prop hit / total games</Text>
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.termText}>L5, L10, Season, Hit Rate</Text>
          <Text style={styles.descriptionText}>
            The difference between the hit rate and the probability implied by the odds.{' '}
            <Text style={styles.boldedText}>A higher number implies a better bet.</Text>
            {'\n'}
            <Text style={styles.hintText}> # hit rate - % implied probability of odds</Text>
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.termText}>Streak</Text>
          <Text style={styles.descriptionText}>
            The number of consecutive games the prop has been covered.{' '}
            <Text style={styles.boldedText}>A higher number implies a better bet.</Text>
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.termText}>EV</Text>
          <Text style={styles.descriptionText}>
            Estimates the long-term profitability of a wager. For example, if you were to make the
            same bet in perpetuity, you would on average of X% (EV) on the wager.{' '}
            <Text style={styles.boldedText}>A higher positive EV is considered a good bet.</Text>
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.termText}>Implied Probability</Text>
          <Text style={styles.descriptionText}>
            The odds converted to profitability. For example, +100 is 50% and -200 is 67%.
          </Text>
        </View>
        <View style={{ ...styles.rowContainer, marginBottom: 16 }}>
          <Text style={styles.termText}>Match Grade</Text>
          <Text style={styles.descriptionText}>
            Proprietary grade based on the ranking of the offensive team.{' '}
            <Text style={styles.boldedText}>
              A higher grade would indicate more favorable conditions for the prop.
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  modalContainer: {
    width: '85%',
    borderRadius: 30,
    backgroundColor: variables.colors.white,
    alignItems: 'center',
    padding: 16
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: variables.colors.headerYellow,
    marginBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 8
  },
  termText: {
    fontSize: 12,
    flex: 0.21,
    marginRight: 35,
    marginLeft: -20
  },
  descriptionText: {
    fontSize: 10,
    flex: 0.6,
    marginRight: -20
  },
  divider: {
    height: '83%',
    width: 1,
    backgroundColor: variables.colors.activeGrey,
    position: 'absolute',
    top: 70,
    left: '34%'
  },
  boldedText: {
    fontWeight: '600'
  },
  hintText: {
    color: variables.colors.activeGrey
  }
});
