import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import Video from 'react-native-video';

interface MediaItem {
  uri: string;
  type: string;
}

interface DynamicCollageProps {
  images: MediaItem[];
  matrix: number[];
  direction: 'row' | 'column';
  currentIndex: number;
}

const screenWidth = Dimensions.get('window').width;

const DynamicCollage: React.FC<DynamicCollageProps> = ({ images, matrix, direction, currentIndex }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const renderMatrix = () => {
    const sectionDirection = direction === 'row' ? 'column' : 'row';
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

    return matrix.map((element, m, array) => {
      const startIndex = m ? array.slice(0, m).reduce(reducer) : 0;
      const mediaElements = images.slice(startIndex, startIndex + element).map((item, i) => (
        <View key={`${m}-${i}`} style={styles.mediaContainer}>
          {item.type.startsWith('image') ? (
            <Image source={{ uri: item.uri }} style={styles.media} />
          ) : (
            <Video
              source={{ uri: item.uri }}
              style={styles.media}
              resizeMode="cover"
              repeat
            />
          )}
        </View>
      ));

      return (
        <View key={m} style={{ flex: 1, flexDirection: sectionDirection }}>
          {mediaElements}
        </View>
      );
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={{ flex: 1, flexDirection: direction }}>{renderMatrix()}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenWidth,
    borderWidth: 4,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  mediaContainer: {
    flex: 1,
    margin: 2, // Adds spacing between media items
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default DynamicCollage;
