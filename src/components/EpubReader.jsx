import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function EpubReader({ filePath, fontSize = 18, scrollSpeed = 1, onError }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);
  
  useEffect(() => {
    if (filePath) {
      loadEpub();
    }
  }, [filePath]);

  const loadEpub = async () => {
    try {
      setIsLoading(true);
      console.log('Loading EPUB from:', filePath);
      
      // First check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        throw new Error('EPUB file not found');
      }

      console.log('File exists, reading content...');

      // Read the file content
      const content = await FileSystem.readAsStringAsync(filePath);
      console.log('Content read, length:', content.length);

      // For now, we'll display the raw content in a styled container
      const styledContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            <style>
              body {
                font-size: ${fontSize}px;
                line-height: 1.5;
                color: #FFFFFF;
                background-color: #1c1a1a;
                padding: 20px;
                margin: 0;
                font-family: system-ui, -apple-system, sans-serif;
              }
              * {
                color: #FFFFFF !important;
                background-color: transparent !important;
              }
              pre {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
            </style>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
        </html>
      `;
      
      setContent(styledContent);
      console.log('Content styled and set');
    } catch (error) {
      console.error('Error loading EPUB:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scrolling script
  const autoScrollScript = `
    let lastScrollTime = 0;
    const scrollSpeed = ${scrollSpeed};
    
    function autoScroll() {
      const now = Date.now();
      const elapsed = now - lastScrollTime;
      lastScrollTime = now;
      
      const pixelsPerSecond = scrollSpeed * 20;
      const pixelsToScroll = (pixelsPerSecond * elapsed) / 1000;
      
      window.scrollBy(0, pixelsToScroll);
      requestAnimationFrame(autoScroll);
    }
    
    requestAnimationFrame(autoScroll);
  `;

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: content }}
        style={styles.webview}
        injectedJavaScript={autoScrollScript}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error:', nativeEvent);
          if (onError) {
            onError(new Error(nativeEvent.description));
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1a1a',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: '#1c1a1a',
  },
});
