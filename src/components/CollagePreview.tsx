import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Layout {
  direction: 'row' | 'column';
  matrix: number[];
}

interface CollagePreviewProps {
  layout: Layout;
  size: number;
}

const CollagePreview: React.FC<CollagePreviewProps> = ({ layout, size }) => {
  const renderMatrix = () => {
    const sectionDirection = layout.direction === 'row' ? 'column' : 'row';
    return layout.matrix.map((item, index) => (
      <View
        key={index}
        style={[
          styles.box,
          {
            flexDirection: sectionDirection,
            flex: item,
            backgroundColor: index % 2 === 0 ? '#d3d3d3' : '#a9a9a9',
          },
        ]}
      />
    ));
  };

  return (
    <View
      style={[
        styles.previewContainer,
        {
          flexDirection: layout.direction,
          width: size,
          height: size,
        },
      ]}
    >
      {renderMatrix()}
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
  },
  box: {
    flex: 1,
    margin: 1,
  },
});

export default CollagePreview;
