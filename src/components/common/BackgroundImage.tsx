import React from 'react';
import { StyleSheet, View, Image, ViewStyle, ImageSourcePropType } from 'react-native';

interface BackgroundImageProps {
  children: React.ReactNode;
  image: ImageSourcePropType;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children, image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default BackgroundImage;
