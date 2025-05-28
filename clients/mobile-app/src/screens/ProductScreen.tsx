import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import ProductViewer from "../components/ProductViewer";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import ShoppingCartIcon from "../../assets/icons/shopping-cart.svg";

interface ProductScreenProps {
  route: any;
  navigation: any;
}

export const ProductScreen: React.FC<ProductScreenProps> = ({
  route,
  navigation,
}) => {
  const { item } = route.params;

  const handleBuyNowPress = () => {
    const productLink = item.productLink;
    Linking.openURL(productLink);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeftIcon width={32} height={32} />
      </TouchableOpacity>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.productViewerContainer}>
          <ProductViewer imageUrls={item.imageUrls} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={styles.brandText}>{item.brand}</Text>
            <Text style={styles.headerText}>{item.name}</Text>
          </View>
          <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={handleBuyNowPress}
        >
          <ShoppingCartIcon width={30} height={30} />
          <Text style={styles.buyNowText}>Buy</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    width: 35,
    height: 35,
    backgroundColor: "rgba(230, 230, 230)",
    borderRadius: 25,
    top: 60,
    left: 13,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    color: "black",
    marginTop: 0,
    marginLeft: 20,
  },
  brandText: {
    fontSize: 20,
    color: "gray",
    marginLeft: 20,
  },
  priceText: {
    marginRight: 20,
    fontSize: 25,
  },
  productViewerContainer: {
    marginTop: 55,
    marginBottom: 20,
  },
  buyNowButton: {
    width: "90%",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 80,
  },
  buyNowText: {
    paddingLeft: 15,
    color: "white",
    fontSize: 27,
  },
});
