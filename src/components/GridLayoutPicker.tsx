import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { LayoutData } from './LayoutData';

interface GridLayoutPickerProps {
  onLayoutSelected: (layout: { direction: 'row' | 'column'; matrix: number[] }) => void;
}

const GridLayoutPicker: React.FC<GridLayoutPickerProps> = ({ onLayoutSelected }) => {
  return (
    <View style={styles.container}>
      {Object.entries(LayoutData).map(([key, layouts]) => (
        layouts.map((layout, index) => (
          <Button
            key={`${key}-${index}`}
            title={`Layout ${key}-${index + 1}`}
            onPress={() => onLayoutSelected(layout as { direction: 'row' | 'column'; matrix: number[] })}
          />
        ))
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
  },
});

export default GridLayoutPicker;
