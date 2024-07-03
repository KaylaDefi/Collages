import React, { useState, useEffect } from 'react';
import { View, PanResponder, Image, StyleSheet, PanResponderInstance } from 'react-native';
import Video from 'react-native-video';

interface MediaItem {
  uri: string;
  type: string;
}

interface CollageProps {
  media: MediaItem[];
}

const Collage: React.FC<CollageProps> = ({ media }) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setPositions(media.map(() => ({ x: 0, y: 0 })));
  }, [media]);

  const panResponders: PanResponderInstance[] = media.map((item, index) =>
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[index] = { x: gestureState.dx, y: gestureState.dy };
          return newPositions;
        });
      },
    })
  );

  return (
    <View style={styles.collageContainer}>
      {media.map((item, index) => (
        <View
          key={index}
          style={{
            transform: [{ translateX: positions[index]?.x || 0 }, { translateY: positions[index]?.y || 0 }],
          }}
          {...panResponders[index].panHandlers}
        >
          {item.type.startsWith('image') ? (
            <Image source={{ uri: item.uri }} style={styles.media} />
          ) : (
            <Video source={{ uri: item.uri }} style={styles.media} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  collageContainer: {
    flex: 1,
    position: 'relative',
  },
  media: {
    width: 100,
    height: 100,
  },
});

export default Collage;
