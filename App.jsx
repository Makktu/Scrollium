import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Options from './src/screens/Options';
import CustomButton from './src/components/CustomButton';
import MainImage from './src/components/MainImage';
import ReadingScreen from './src/screens/ReadingScreen';
import { sampleText } from './books/sampleText';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [startReading, setStartReading] = useState(false);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [currentText, setCurrentText] = useState('Lorem ipsum dolor sit amet');
  const [scrollSpeed, setScrollSpeed] = useState(3); // auto-scrolling speed in lines per second
  return (
    <View style={styles.container}>
      {(startReading && (
        <ReadingScreen
          scrollSpeed={scrollSpeed}
          currentText={sampleText}
          mainMenu={() => setStartReading(false)}
        />
      )) ||
        (showOptions && (
          <Options title='Back' dismissOptions={() => setShowOptions(false)} />
        )) || (
          <View>
            <View style={styles.imageContainer}>
              <MainImage />
            </View>

            <Text style={{ color: 'white', fontSize: 70 }}>Scrollium</Text>
            <CustomButton
              title='Options'
              whenPressed={() => setShowOptions(true)}
            ></CustomButton>
            <CustomButton
              title='START'
              btnColor='green'
              whenPressed={() => setStartReading(true)}
            ></CustomButton>
            <CustomButton
              title='LOAD NEW'
              whenPressed={() => setLoading(true)}
            ></CustomButton>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Currently Reading:</Text>
              <Text style={styles.text}>{currentText}</Text>
            </View>
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
  text: {
    color: '#f18f07',
    fontSize: 20,
  },
  infoBox: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
