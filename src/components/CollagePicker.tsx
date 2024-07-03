import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, Asset, MediaType } from 'react-native-image-picker';

interface MediaItem {
  uri: string;
  type: string;
}

interface CollagePickerProps {
  onMediaPicked: (media: MediaItem[]) => void;
}

const CollagePicker: React.FC<CollagePickerProps> = ({ onMediaPicked }) => {
  const pickMedia = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'mixed' as MediaType,
      selectionLimit: 0, // 0 means no limit, allowing multiple selections
    };

    launchImageLibrary(options, (response) => {
      if (response.errorMessage) {
        console.error(response.errorMessage);
      } else {
        const newMedia = response.assets?.map((asset: Asset) => ({
          uri: asset.uri!,
          type: asset.type!,
        })) ?? [];
        onMediaPicked(newMedia);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Media" onPress={pickMedia} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default CollagePicker;
