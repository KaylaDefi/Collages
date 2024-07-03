import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, Asset, MediaType } from 'react-native-image-picker';
import Video from 'react-native-video';

interface MediaItem {
  uri: string;
  type: string;
}

const CollagePicker: React.FC<{ onMediaPicked: (media: MediaItem[]) => void }> = ({ onMediaPicked }) => {
  const [media, setMedia] = useState<MediaItem[]>([]);

  const pickMedia = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'mixed' as MediaType, // Ensure the correct type is used
    };

    launchImageLibrary(options, (response) => {
      if (response.errorMessage) {
        console.error(response.errorMessage);
      } else {
        const newMedia = response.assets?.map((asset: Asset) => ({
          uri: asset.uri!,
          type: asset.type!,
        })) ?? [];
        setMedia((prevMedia) => [...prevMedia, ...newMedia]);
        onMediaPicked([...media, ...newMedia]);
      }
    });
  };

  return (
    <View>
      <Button title="Pick Media" onPress={pickMedia} />
      {media.map((item, index) => (
        <View key={index} style={styles.mediaContainer}>
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
  mediaContainer: {
    margin: 5,
  },
  media: {
    width: 100,
    height: 100,
  },
});

export default CollagePicker;
