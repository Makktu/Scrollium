import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import ReadingHud from '../components/ReadingHud';

export default function ReadingScreen({ currentText, mainMenu }) {
  const [showingHud, setShowingHud] = useState(false);

  const screenTapped = () => {
    setShowingHud(!showingHud);
    console.log('Screen tapped');
  };

  const dismissHud = () => {
    setShowingHud(false);
  };

  // need to dim background when screen tapped and show HUD controls

  return (
    <>
      {showingHud ? (
        <ReadingHud dismissHud={dismissHud} mainMenu={mainMenu} />
      ) : (
        <TouchableOpacity style={styles.wholeScreen} onPress={screenTapped}>
          <Text style={{ color: 'white', fontSize: 30 }}>{currentText}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#1c1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
