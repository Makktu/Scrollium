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
import React, { useRef, useEffect, useMemo } from 'react';
import { useState } from 'react';
import ReadingHud from '../components/ReadingHud';
// import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 52 : StatusBar.currentHeight || 0;

const baseStyles = StyleSheet.create({
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
});

export default function ReadingScreen({
  scrollSpeed = 1,
  currentText,
  mainMenu,
}) {
  const [showingHud, setShowingHud] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(scrollSpeed);
  const [fontSize, setFontSize] = useState(18);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
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

    const pixelsPerSecond = speed * 20; // 20 pixels per line
    const interval = 16; // ~60fps
    const pixelsPerInterval = (pixelsPerSecond * interval) / 1000;

    autoScrollTimer.current = setInterval(() => {
      if (
        scrollViewRef.current &&
        !showingHud &&
        !isPaused &&
        !isManualScrolling
      ) {
        scrollY.current += pixelsPerInterval;
        scrollViewRef.current.scrollTo({
          y: scrollY.current,
          animated: false,
        });
      }
    }, interval);
  };

  useEffect(() => {
    if (!showingHud) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [showingHud, speed, isPaused, isManualScrolling]);

  const handleScroll = (event) => {
    scrollY.current = event.nativeEvent.contentOffset.y;
  };

  const handleTouchStart = () => {
    touchStartTime.current = new Date().getTime();
    setIsManualScrolling(true);
  };

  const handleTouchEnd = () => {
    const touchDuration = new Date().getTime() - touchStartTime.current;
    const currentTime = new Date().getTime();
    const timeSinceLastTap = currentTime - lastTapTime.current;

    // Handle double tap for HUD
    if (timeSinceLastTap < 300) {
      setShowingHud(!showingHud);
      setIsManualScrolling(false);
      return;
    }

    // If it's a short tap (less than 200ms), toggle auto-scroll
    if (touchDuration < 200) {
      setIsPaused(!isPaused);
      setIsManualScrolling(false);
    } else {
      // Keep manual scrolling enabled until user taps to resume
      setIsPaused(true);
    }

    lastTapTime.current = currentTime;
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  const dismissHud = () => {
    setShowingHud(false);
    // Ensure scroll position is maintained when HUD is dismissed
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: scrollY.current,
        animated: false,
      });
    }
  };

  const adjustSpeed = (increment) => {
    setSpeed((prevSpeed) => {
      const newSpeed = Math.max(0, Math.min(8, prevSpeed + increment));
      return Number(newSpeed.toFixed(2));
    });
  };

  // Create dynamic text style based on fontSize
  const textStyle = useMemo(
    () => ({
      color: '#fff',
      fontSize: fontSize,
      lineHeight: fontSize * 1.5,
      alignSelf: 'stretch',
      paddingHorizontal: 20,
    }),
    [fontSize]
  );

  return (
    <View style={baseStyles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#1c1a1a' />
      <View style={baseStyles.statusBarPlaceholder} />
      <ScrollView
        ref={scrollViewRef}
        style={baseStyles.scrollView}
        contentContainerStyle={baseStyles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(w, h) => setContentHeight(h)}
      >
        <View style={baseStyles.spacer} />
        <Text style={textStyle}>{currentText}</Text>
        <View style={baseStyles.bottomSpacer} />
      </ScrollView>
      {showingHud && (
        <View style={StyleSheet.absoluteFill}>
          <ReadingHud
            dismissHud={dismissHud}
            mainMenu={mainMenu}
            currentSpeed={speed}
            onSpeedChange={(dir) => adjustSpeed(dir * 0.5)}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
          />
        </View>
      )}
    </View>
  );
}
