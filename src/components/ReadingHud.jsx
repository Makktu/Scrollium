import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import Slider from '@react-native-community/slider';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ReadingHud({ 
  dismissHud, 
  mainMenu, 
  currentSpeed, 
  onSpeedChange,
  fontSize,
  onFontSizeChange
}) {
  return (
    <View style={styles.overlay}>
      <View style={styles.hudContainer}>
        <View style={styles.speedControls}>
          <TouchableOpacity 
            style={styles.speedButton} 
            onPress={() => onSpeedChange(-1)}
          >
            <Text style={styles.speedButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.speedDisplay}>
            <Text style={styles.speedValue}>{currentSpeed}</Text>
            <Text style={styles.speedLabel}>lines/sec</Text>
          </View>
          <TouchableOpacity 
            style={styles.speedButton} 
            onPress={() => onSpeedChange(1)}
          >
            <Text style={styles.speedButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.controlsContainer}>
          <CustomButton 
            title='Dismiss' 
            whenPressed={dismissHud}
            style={styles.button}
          />
          <CustomButton 
            title='Main Menu' 
            whenPressed={mainMenu}
            style={styles.button}
          />
        </View>

        <View style={styles.fontSizeControl}>
          <View style={styles.fontSizeHeader}>
            <Text style={styles.fontSizeLabel}>Font Size</Text>
            <Text style={styles.fontSizeValue}>{fontSize}px</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={12}
            maximumValue={40}
            step={1}
            value={fontSize}
            onValueChange={onFontSizeChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#666666"
            thumbTintColor="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  hudContainer: {
    width: SCREEN_WIDTH * 0.8,
    padding: 20,
    backgroundColor: 'rgba(28, 26, 26, 0.95)',
    borderRadius: 15,
    alignItems: 'center',
    gap: 30,
  },
  speedControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  speedButton: {
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  speedDisplay: {
    alignItems: 'center',
    minWidth: 80,
  },
  speedValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  speedLabel: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  controlsContainer: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    minWidth: 200,
  },
  fontSizeControl: {
    width: '100%',
    alignItems: 'stretch',
    paddingHorizontal: 10,
  },
  fontSizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fontSizeLabel: {
    color: '#999',
    fontSize: 14,
  },
  fontSizeValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
