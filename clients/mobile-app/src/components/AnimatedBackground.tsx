import React, { useRef, useEffect } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface MovingRowProps {
  durationOffset: number;
  rowIndex: number;
  images: any;
  numberOfRows: number;
}

const MovingRow: React.FC<MovingRowProps> = ({
  durationOffset,
  rowIndex,
  images,
  numberOfRows,
}) => {
  const totalWidth = windowWidth * images.length * 2;
  const translateX = useRef(new Animated.Value(-totalWidth / 2)).current;
  const rowHeight = windowHeight / numberOfRows; // Calculate based on numberOfRows

  useEffect(() => {
    translateX.setValue(-totalWidth / 2);
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 0,
        duration: 30000 + durationOffset,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX, durationOffset, totalWidth]);

  return (
    <Animated.View
      style={[
        styles.row,
        {
          top: rowHeight * rowIndex,
          height: rowHeight,
          transform: [{ translateX }],
        },
      ]}
    >
      {[...images, ...images].map((image, index) => (
        <Animated.Image
          key={index}
          source={image}
          style={{ width: rowHeight, height: rowHeight }}
        />
      ))}
    </Animated.View>
  );
};

interface AnimatedBackgroundProps {
  rowImages: any;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  rowImages,
}) => {
  const numberOfRows = rowImages.length;

  return (
    <View style={StyleSheet.absoluteFill}>
      {rowImages.map((images: any, rowIndex: any) => (
        <MovingRow
          key={rowIndex}
          rowIndex={rowIndex}
          durationOffset={rowIndex * 5000}
          images={images}
          numberOfRows={numberOfRows}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    position: "absolute",
    width: windowWidth * 2,
  },
  square: {
    width: 300,
    height: 300,
  },
});

export default AnimatedBackground;
