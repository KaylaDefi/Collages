import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { LayoutData } from './LayoutData';
import CollagePreview from './CollagePreview';

interface GridLayoutPickerProps {
  onLayoutSelected: (layout: { direction: 'row' | 'column'; matrix: number[] }) => void;
}

const GridLayoutPicker: React.FC<GridLayoutPickerProps> = ({ onLayoutSelected }) => {
  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      {Object.entries(LayoutData).map(([key, layouts]) => (
        <View key={key} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Layouts for {key} items</Text>
          <View style={styles.layoutsContainer}>
            {layouts.map((layout, index) => (
              <TouchableOpacity
                key={`${key}-${index}`}
                onPress={() => onLayoutSelected(layout as { direction: 'row' | 'column'; matrix: number[] })}
              >
                <CollagePreview layout={layout} size={80} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 10,
    alignItems: 'center',
  },
  categoryContainer: {
    margin: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  layoutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default GridLayoutPicker;
