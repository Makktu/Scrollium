import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomButton({
  title = '',
  btnColor = 'white',
  whenPressed,
}) {
  return (
    <View style={[styles.button, { backgroundColor: btnColor }]}>
      <TouchableOpacity onPress={whenPressed}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
