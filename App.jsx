import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Options from './src/screens/Options';
import CustomButton from './src/components/CustomButton';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <View style={styles.container}>
      {(showOptions && (
        <Options title='Back' dismissOptions={() => setShowOptions(false)} />
      )) || (
        <View>
          <Text style={{ color: 'white', fontSize: 70 }}>Scrollium</Text>
          <CustomButton
            title='Options'
            whenPressed={() => setShowOptions(true)}
          ></CustomButton>
          <StatusBar style='light' />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
