import React, { useState } from "react";
import { View, Image, ScrollView, Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

interface ProductViewerProps {
  imageUrls: any;
}

const ProductViewer: React.FC<ProductViewerProps> = ({ imageUrls }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / windowWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.viewerContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        {imageUrls.map((image: any, index: any) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.dotView}>
        {imageUrls.map((_: any, index: any) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewerContainer: {
    height: 650,
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "flex-start",
  },
  scrollView: {
    height: 650,
    width: "100%",
  },
  image: {
    width: windowWidth,
    height: 700,
    resizeMode: "cover",
  },
  dotView: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  activeDot: {
    backgroundColor: "white",
  },
});

export default ProductViewer;
