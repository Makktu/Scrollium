import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import ReadingHud from '../components/ReadingHud';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ReadingScreen({ scrollSpeed = 1, currentText, mainMenu }) {
  const [showingHud, setShowingHud] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastTapTime = useRef(0);
  const lastScrollValue = useRef(0);
  
  // Animation ref to control auto-scrolling
  const scrollAnimation = useRef(null);

  const startAutoScroll = () => {
    if (scrollAnimation.current) {
      scrollAnimation.current.stop();
    }

    const remainingDistance = contentHeight - viewportHeight - lastScrollValue.current;
    if (remainingDistance <= 0) return;

    const pixelsPerLine = 20;
    const remainingLines = remainingDistance / pixelsPerLine;
    const duration = (remainingLines / scrollSpeed) * 1000;

    scrollAnimation.current = Animated.timing(scrollY, {
      toValue: contentHeight - viewportHeight,
      duration: duration,
      useNativeDriver: true,
    });

    scrollAnimation.current.start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        // Handle double tap for HUD
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapTime.current;
        
        if (tapLength < 300) {  // Double tap threshold
          setShowingHud(!showingHud);
        }
        lastTapTime.current = currentTime;

        // Stop auto-scrolling when user touches
        if (scrollAnimation.current) {
          scrollAnimation.current.stop();
        }
        scrollY.stopAnimation((value) => {
          lastScrollValue.current = value;
        });
        setIsUserScrolling(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        const newValue = lastScrollValue.current - gestureState.dy;
        const clampedValue = Math.max(0, Math.min(newValue, contentHeight - viewportHeight));
        scrollY.setValue(clampedValue);
      },
      onPanResponderRelease: () => {
        scrollY.stopAnimation((value) => {
          lastScrollValue.current = value;
        });
        setIsUserScrolling(false);
        if (!showingHud) {
          startAutoScroll();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (!showingHud && contentHeight > 0 && viewportHeight > 0 && !isUserScrolling) {
      startAutoScroll();
    }
    return () => {
      if (scrollAnimation.current) {
        scrollAnimation.current.stop();
      }
    };
  }, [showingHud, contentHeight, viewportHeight, scrollSpeed, isUserScrolling]);

  const dismissHud = () => {
    setShowingHud(false);
  };

  return (
    <View 
      style={styles.container}
      onLayout={(event) => {
        setViewportHeight(event.nativeEvent.layout.height);
      }}
      {...panResponder.panHandlers}
    >
      {showingHud ? (
        <ReadingHud dismissHud={dismissHud} mainMenu={mainMenu} />
      ) : (
        <View style={styles.textContainer}>
          <Animated.View
            style={[
              styles.scrollContainer,
              {
                transform: [{
                  translateY: scrollY.interpolate({
                    inputRange: [0, contentHeight - viewportHeight],
                    outputRange: [0, -(contentHeight - viewportHeight)],
                  })
                }]
              }
            ]}
            onLayout={(event) => {
              setContentHeight(event.nativeEvent.layout.height);
            }}
          >
            <View style={styles.spacer} />
            <Text style={styles.text}>{currentText}</Text>
            <View style={styles.bottomSpacer} />
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1a1a',
  },
  textContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollContainer: {
    paddingHorizontal: 20,
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
  },
});