# Scrollium

A customizable text scrolling reader that transforms the user's reading experience by automatically scrolling text, hands-free, at their preferred pace.

## Description

Scrollium is a mobile reading application that presents text in a smooth, vertical scroll format. Designed for both phone and tablet, it allows readers to customize their reading experience through adjustable scroll speeds and display settings.

### Reading Focus & Engagement

Scrollium's auto-scrolling mechanism creates a unique reading dynamic that helps maintain focus and engagement:

- Creates a gentle sense of urgency that keeps readers engaged with the text
- Reduces the tendency for attention to drift that often occurs with static text
- Leverages the natural inclination to follow moving content (similar to social media scrolling)
- Helps readers maintain a consistent reading pace
- Particularly beneficial for readers who struggle with focus or find traditional, static text challenging
- Transforms passive reading into a more active, dynamic experience

## Core Features

- Customizable scrolling speed for comfortable reading
- Settings configuration for personal reading preferences
- iOS compatibility (phone and tablet)
- Text import capabilities
- Progress saving
- Responsive design for different screen sizes

## Planned Features

### Phase 1 - Basic Scrolling

- Smooth vertical text scrolling
- Speed control interface
- Basic settings implementation
- Responsive layout for different iOS devices

### Phase 2 - Text Import

- File picking functionality
- Plain text file support
- Basic file storage
- Reading progress tracking

### Phase 3 - eBook Support

- ePub file compatibility
- Text extraction and formatting
- Basic style preservation
- Book library management

### Phase 4 - Reader Enhancement

- Font customization
- Color themes
- Speed presets
- Reading position bookmarks
- Progress tracking

### Phase 5 - Advanced Features

- Different scroll modes including:
  - Standard vertical scroll
  - "Star Wars"-style perspective scroll (Title Scroll)
- ePub format optimization
- Performance improvements
- Enhanced error handling

## Technical Notes

### eBook Handling

- ePub files are HTML-based packages containing:
  - XHTML/HTML content files
  - CSS styling
  - Navigation files
  - Book metadata
  - Media assets

### Implementation Considerations

- File system access requirements
- ePub parsing methodology
- Storage optimization
- DRM considerations
- Cross-device compatibility
- Performance optimization for smooth scrolling

## Development Roadmap

1. Basic prototype with core scrolling functionality
2. Text import and storage implementation
3. ePub integration
4. Reader feature expansion
5. Polish and optimization

## Current Status

Initial development phase - establishing basic project structure and core functionality.

## 27 Jan 2025

Set up basic scrolling behaviour - still a mess, but got it working without needing a library.
Using RN's own Animated.
Need to fix the auto-scrolling logic to make it more fluid and responsive and permit the user to manually control the scrolling when they want to.

## 28 Jan 2025

Added auto-scrolling functionality, but need to work on the logic a bit more, esp. pausing and resuming the scroll.
User can manually scroll when they please.

## 29 Jan 2025

Worked on the auto-scroll logic, 95% of the way there now. Just need to work on how (or if) to allow for the user to 'fling' the text up/down and intertially scroll. This is an intuitive part of reading long content on phones so it *will* have to be implemented

## 31 Jan 2025

Basic functionality complete - with 'clean' text pre-prepared for display... 
Next step is to add support for ePub files and other formats.
Made a start but the libraries are new to me and nothing works yet.
Turns out mobile ereaders are a bit tricky to make.