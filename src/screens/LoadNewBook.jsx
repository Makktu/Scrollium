import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import * as Clipboard from 'expo-clipboard';

export default function LoadNewBook({ mainMenu, pastedText }) {
  const addClipboardText = async () => {
    console.log('addClipboardText');
    const text = await Clipboard.getStringAsync();
    pastedText(text);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={[styles.title, styles.text]}>Load New Content</Text>
          <Text style={styles.text}>
            This can be any text. You can pick a file from your device, or paste
            it into the text box below
          </Text>
        </View>
        <View style={styles.textArea}>
          <CustomButton
            title='Paste content from clipboard'
            whenPressed={addClipboardText}
          />
          <TextInput style={styles.textInput}></TextInput>
        </View>
      </View>
      <View styles={styles.buttonContainer}>
        <CustomButton title='Main Menu' whenPressed={mainMenu} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    layout: 'fixed',
    justifyContent: 'flex-end',
  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    top: 40,
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
