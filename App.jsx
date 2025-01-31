import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Options from './src/screens/Options';
import CustomButton from './src/components/CustomButton';
import MainImage from './src/components/MainImage';
import ReadingScreen from './src/screens/ReadingScreen';
import { sampleText } from './books/sampleText';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export default function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [startReading, setStartReading] = useState(false);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(3);
  const [currentFileType, setCurrentFileType] = useState('text');
  const [currentFilePath, setCurrentFilePath] = useState(null);

  const epubFileName = 'fountainhead.epub';
  const destinationPath = FileSystem.documentDirectory + epubFileName;
  let currentTextTitle = currentFileType === 'epub' ? 'The Fountainhead' : 'Frankenstein';

  useEffect(() => {
    const setupEpubFile = async () => {
      try {
        // Check if file already exists in document directory
        const fileInfo = await FileSystem.getInfoAsync(destinationPath);
        
        if (!fileInfo.exists) {
          // Load the asset
          const asset = Asset.fromModule(require('./assets/books/fountainhead.epub'));
          await asset.downloadAsync();
          
          // Copy from asset to document directory
          await FileSystem.copyAsync({
            from: asset.localUri,
            to: destinationPath
          });
          console.log('File copied successfully to:', destinationPath);
        } else {
          console.log('File already exists at:', destinationPath);
        }
      } catch (error) {
        console.error('Error in setupEpubFile:', error);
        Alert.alert('Error', 'Could not set up EPUB file');
      }
    };

    setupEpubFile();
  }, []);

  const handleStartReading = () => {
    setCurrentFileType('text');
    setCurrentFilePath(null);
    setStartReading(true);
  };

  const handleLoadNew = async () => {
    try {
      console.log('Attempting to load EPUB from:', destinationPath);
      const fileInfo = await FileSystem.getInfoAsync(destinationPath);
      console.log('File info:', fileInfo);
      
      if (!fileInfo.exists) {
        Alert.alert('Error', 'EPUB file not found. Please try again.');
        return;
      }
      
      setCurrentFileType('epub');
      setCurrentFilePath(destinationPath);
      setStartReading(true);
    } catch (error) {
      console.error('Error loading EPUB:', error);
      Alert.alert('Error', 'Could not load EPUB file');
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {(startReading && (
          <ReadingScreen
            scrollSpeed={scrollSpeed}
            currentText={sampleText}
            mainMenu={() => setStartReading(false)}
            fileType={currentFileType}
            filePath={currentFilePath}
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
              />
              <CustomButton
                title='START'
                btnColor='green'
                whenPressed={handleStartReading}
              />
              <CustomButton
                title='LOAD EPUB'
                whenPressed={handleLoadNew}
              />
              <View style={styles.infoBox}>
                <Text style={styles.text}>Currently Reading:</Text>
                <Text style={styles.text}>{currentTextTitle}</Text>
              </View>
              <StatusBar style='light' />
            </View>
          )}
      </View>
    </SafeAreaProvider>
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
