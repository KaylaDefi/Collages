import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Button, View, ScrollView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CollagePicker from './src/components/CollagePicker';
import GridLayoutPicker from './src/components/GridLayoutPicker';
import DynamicCollage from './src/components/DynamicCollage';
import DisplayScreen from './src/components/DisplayScreen';
import { LayoutData } from './src/components/LayoutData';
import Video, { VideoRef } from 'react-native-video';

interface MediaItem {
  uri: string;
  type: string;
}

type RootStackParamList = {
  Home: undefined;
  Display: { media: MediaItem[]; layout: { direction: 'row' | 'column'; matrix: number[] } };
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [layout, setLayout] = useState(LayoutData[4][0]); // Default to 4 image layout
  const videoRef = useRef<VideoRef>(null);

  const handleMediaPicked = (pickedMedia: MediaItem[]) => {
    console.log('Media picked:', pickedMedia);
    setMedia(pickedMedia);
  };

  const handleLayoutSelected = (selectedLayout: { direction: 'row' | 'column'; matrix: number[] }) => {
    console.log('Layout selected:', selectedLayout);
    setLayout(selectedLayout);
  };

  const goToDisplayMode = () => {
    if (media.length === 0) {
      console.error('No media selected');
      return;
    }
    console.log('Navigating to DisplayScreen with media:', media, 'and layout:', layout);
    navigation.navigate('Display', { media, layout });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CollagePicker onMediaPicked={handleMediaPicked} />
        <GridLayoutPicker onLayoutSelected={handleLayoutSelected} />
        {media.length > 0 ? (
          <View style={styles.previewContainer}>
            <DynamicCollage
              images={media}
              matrix={layout.matrix}
              direction={layout.direction}
              currentIndex={0}
              onVideoEnd={() => {}}
              videoRef={videoRef}
            />
          </View>
        ) : (
          <Text>No media selected yet</Text>
        )}
        <Button title="Go to Display Mode" onPress={goToDisplayMode} />
      </ScrollView>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Collage Picker' }} />
        <Stack.Screen name="Display" component={DisplayScreen} options={{ title: 'Display Mode' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  previewContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
});

export default App;
