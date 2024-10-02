import React from 'react';
import { ActivityIndicator, ColorValue, View, StyleSheet } from 'react-native';
import { variables } from '~/utils/mixins';

interface OverlayLoaderProps {
  isLoading: boolean;
  size?: 'small' | 'large';
  color?: ColorValue;
  isOverlay?: boolean;
}

const OverlayLoader = ({
  isLoading = true,
  size = 'large',
  color = '#ffff',
  isOverlay = true
}: OverlayLoaderProps) => {
  if (!isLoading) {
    return null;
  }

  if (!isOverlay) {
    return <ActivityIndicator size={size} color={color} />;
  }

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: variables.colors.loginBackgroundColor,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000
  }
});

export default OverlayLoader;
