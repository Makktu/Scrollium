import { StyleSheet, Button } from 'react-native';
import React from 'react';

export default function CustomButton({ title, whenPressed }) {
  return <Button title={title} onPress={whenPressed} />;
}

const styles = StyleSheet.create({});
