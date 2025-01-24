import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';

export default function ReadingHud({ dismissHud, mainMenu }) {
  return (
    <View>
      <Text>ReadingHud</Text>
      <CustomButton title='Dismiss' whenPressed={dismissHud}></CustomButton>
      <CustomButton title='Main Menu' whenPressed={mainMenu}></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({});
