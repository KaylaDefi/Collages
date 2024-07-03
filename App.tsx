import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CollagePicker from './src/components/CollagePicker.tsx';
import Collage from './src/components/Collage.tsx';

interface MediaItem {
  uri: string;
  type: string;
}

const App: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);

  const handleMediaPicked = (pickedMedia: MediaItem[]) => {
    setMedia(pickedMedia);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CollagePicker onMediaPicked={handleMediaPicked} />
      <Collage media={media} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
