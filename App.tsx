import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CollagePicker from './src/components/CollagePicker';
import GridLayoutPicker from './src/components/GridLayoutPicker';
import DynamicCollage from './src/components/DynamicCollage';
import DisplayScreen from './src/components/DisplayScreen';
import { LayoutData } from './src/components/LayoutData';

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

  const handleMediaPicked = (pickedMedia: MediaItem[]) => {
    setMedia(pickedMedia);
  };

  const handleLayoutSelected = (selectedLayout: { direction: 'row' | 'column'; matrix: number[] }) => {
    setLayout(selectedLayout);
  };

  const goToDisplayMode = () => {
    navigation.navigate('Display', { media, layout });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CollagePicker onMediaPicked={handleMediaPicked} />
      <GridLayoutPicker onLayoutSelected={handleLayoutSelected} />
      {media.length > 0 && (
        <View style={styles.previewContainer}>
          <DynamicCollage images={media} matrix={layout.matrix} direction={layout.direction} currentIndex={0} />
        </View>
      )}
      <Button title="Go to Display Mode" onPress={goToDisplayMode} />
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
  previewContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
});

export default App;