import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

interface MediaItem {
  uri: string;
  type: string;
}

interface CollageProps {
  media: MediaItem[];
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Collage: React.FC<CollageProps> = ({ media }) => {
  const positions = useRef<Animated.ValueXY[]>([]);
  const scales = useRef<Animated.Value[]>([]);
  const rotations = useRef<Animated.Value[]>([]);

  const [currentScales, setCurrentScales] = useState<number[]>([]);
  const [currentRotations, setCurrentRotations] = useState<number[]>([]);

  useEffect(() => {
    positions.current = media.map(() => new Animated.ValueXY());
    scales.current = media.map(() => new Animated.Value(1));
    rotations.current = media.map(() => new Animated.Value(0));

    setCurrentScales(media.map(() => 1));
    setCurrentRotations(media.map(() => 0));
  }, [media]);

  if (positions.current.length !== media.length) {
    return null; // or some fallback UI
  }

  const panResponders = media.map((_, index) =>
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: positions.current[index].x, dy: positions.current[index].y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // You can add some animation or boundary check here if needed
      },
    })
  );

  const handlePinch = (index: number) => {
    const newScale = currentScales[index] + 0.1;
    scales.current[index].setValue(newScale);
    const newCurrentScales = [...currentScales];
    newCurrentScales[index] = newScale;
    setCurrentScales(newCurrentScales);
  };

  const handleRotate = (index: number) => {
    const newRotation = currentRotations[index] + 15;
    rotations.current[index].setValue(newRotation);
    const newCurrentRotations = [...currentRotations];
    newCurrentRotations[index] = newRotation;
    setCurrentRotations(newCurrentRotations);
  };

  return (
    <View style={styles.collageContainer}>
      {media.map((item, index) => {
        const animatedStyle = {
          transform: [
            { translateX: positions.current[index].x },
            { translateY: positions.current[index].y },
            { scale: scales.current[index] },
            {
              rotate: rotations.current[index].interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        };

        return (
          <Animated.View
            key={index}
            style={[styles.mediaContainer, animatedStyle]}
            {...panResponders[index].panHandlers}
          >
            <TouchableOpacity
              onLongPress={() => handlePinch(index)}
              onPressOut={() => handleRotate(index)}
            >
              {item.type.startsWith('image') ? (
                <Image source={{ uri: item.uri }} style={styles.media} />
              ) : (
                <Video source={{ uri: item.uri }} style={styles.media} />
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  collageContainer: {
    flex: 1,
    position: 'relative',
  },
  mediaContainer: {
    position: 'absolute',
    top: screenHeight / 2 - 50,
    left: screenWidth / 2 - 50,
  },
  media: {
    width: 100,
    height: 100,
  },
});

export default Collage;
