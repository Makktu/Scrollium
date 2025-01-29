import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import ReadingHud from '../components/ReadingHud';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 52 : StatusBar.currentHeight || 0;

export default function ReadingScreen({ scrollSpeed = 1, currentText, mainMenu }) {
  const [showingHud, setShowingHud] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollViewRef = useRef(null);
  const scrollY = useRef(0);
  const lastTapTime = useRef(0);
  const touchStartTime = useRef(0);
  const autoScrollTimer = useRef(null);

  // Start auto-scrolling
  const startAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }

    const pixelsPerSecond = scrollSpeed * 20; // 20 pixels per line
    const interval = 16; // ~60fps
    const pixelsPerInterval = (pixelsPerSecond * interval) / 1000;

    autoScrollTimer.current = setInterval(() => {
      if (scrollViewRef.current && !showingHud && !isPaused) {
        scrollY.current += pixelsPerInterval;
        scrollViewRef.current.scrollTo({
          y: scrollY.current,
          animated: false
        });
      }
    }, interval);
  };

  // Stop auto-scrolling
  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  useEffect(() => {
    if (!showingHud) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [showingHud, scrollSpeed, isPaused]);

  const handleScroll = (event) => {
    scrollY.current = event.nativeEvent.contentOffset.y;
  };

  const handleTouchStart = () => {
    touchStartTime.current = new Date().getTime();
  };

  const handleTouchEnd = () => {
    const touchDuration = new Date().getTime() - touchStartTime.current;
    const currentTime = new Date().getTime();
    const timeSinceLastTap = currentTime - lastTapTime.current;

    // Handle double tap for HUD
    if (timeSinceLastTap < 300) {
      setShowingHud(!showingHud);
      return;
    }

    // If it's a short tap (less than 200ms), toggle pause
    if (touchDuration < 200) {
      setIsPaused(!isPaused);
    }

    lastTapTime.current = currentTime;
  };

  const dismissHud = () => {
    setShowingHud(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1c1a1a" />
      <View style={styles.statusBarPlaceholder} />
      {showingHud ? (
        <ReadingHud dismissHud={dismissHud} mainMenu={mainMenu} />
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(w, h) => setContentHeight(h)}
        >
          <View style={styles.spacer} />
          <Text style={styles.text}>{currentText}</Text>
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1a1a',
  },
  statusBarPlaceholder: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: '#1c1a1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  spacer: {
    height: SCREEN_HEIGHT / 2,
  },
  bottomSpacer: {
    height: SCREEN_HEIGHT / 2,
  },
  text: {
    color: 'white', 
    fontSize: 30,
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});