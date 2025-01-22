import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import React from 'react';

export default function Options({ title, dismissOptions }) {
  return (
    <View style={styles.main}>
      <Text>Options</Text>
      <CustomButton title={title} whenPressed={dismissOptions}></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
