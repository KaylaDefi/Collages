import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DynamicCollage from './DynamicCollage';
import Video, { VideoRef } from 'react-native-video';

interface MediaItem {
  uri: string;
  type: string;
}

type RootStackParamList = {
  Home: undefined;
  Display: { media: MediaItem[]; layout: { direction: 'row' | 'column'; matrix: number[] } };
};

type DisplayScreenRouteProp = RouteProp<RootStackParamList, 'Display'>;
type DisplayScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Display'>;

type Props = {
  route: DisplayScreenRouteProp;
  navigation: DisplayScreenNavigationProp;
};

const DisplayScreen: React.FC<Props> = ({ route }) => {
  const { media, layout } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<VideoRef>(null);

  useEffect(() => {
    console.log('DisplayScreen mounted with media:', media, 'and layout:', layout);

    if (media && media.length > 0 && media[currentIndex]?.type.startsWith('image')) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
      }, 20000); // 20 seconds for images

      return () => clearTimeout(timer);
    }
  }, [currentIndex, media]);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  if (!media || media.length === 0) {
    console.error('No media available in DisplayScreen');
    return <View style={styles.container}><Text>No media available</Text></View>;
  }

  return (
    <View style={styles.container}>
      {media.length > 0 && (
        <DynamicCollage
          images={media}
          matrix={layout.matrix}
          direction={layout.direction}
          currentIndex={currentIndex}
          onVideoEnd={handleVideoEnd}
          videoRef={videoRef}
        />
      )}
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#fff',
  },
});

export default DisplayScreen;


