import { Image, StyleSheet } from 'react-native';
import React from 'react';

export default function MainImage() {
  return (
    <Image style={styles.image} source={require('../../assets/img/logo.png')} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
});
