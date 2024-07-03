import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import CollagePicker from './src/components/CollagePicker';
import DynamicCollage from './src/components/DynamicCollage';
import GridLayoutPicker from './src/components/GridLayoutPicker';
import { LayoutData } from './src/components/LayoutData';

interface MediaItem {
  uri: string;
  type: string;
}

const App: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [layout, setLayout] = useState(LayoutData[4][0]); // Default to 4 image layout
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMediaPicked = (pickedMedia: MediaItem[]) => {
    setMedia((prevMedia) => [...prevMedia, ...pickedMedia]);
  };

  const handleLayoutSelected = (selectedLayout: { direction: 'row' | 'column'; matrix: number[] }) => {
    setLayout(selectedLayout);
  };

  const startSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 3000); // Change image/video every 3 seconds
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Restart slideshow when media is added or removed
    startSlideshow();
  }, [media]);

  return (
    <SafeAreaView style={styles.container}>
      <CollagePicker onMediaPicked={handleMediaPicked} />
      <GridLayoutPicker onLayoutSelected={handleLayoutSelected} />
      <Button title="Start Slideshow" onPress={startSlideshow} />
      {media.length > 0 && (
        <DynamicCollage
          images={media}
          matrix={layout.matrix}
          direction={layout.direction}
          currentIndex={currentIndex}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
