import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DynamicCollage from './DynamicCollage';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 5000); // Change image/video every 5 seconds

    return () => clearInterval(interval);
  }, [media]);

  return (
    <View style={styles.container}>
      {media.length > 0 && (
        <DynamicCollage
          images={media}
          matrix={layout.matrix}
          direction={layout.direction}
          currentIndex={currentIndex}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default DisplayScreen;
