import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

interface ShoppingListProps {
  post: any
}

const ShoppingList: React.FC<ShoppingListProps> = ({ post }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    post.productMatches.length > 0
      ? post.productMatches[0]?.apparelCategory
      : null
  );
  const [apparelCategories, setApparelCategories] = useState([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (post.productMatches.length > 0) {
      setSelectedCategory(post.productMatches[0].category);
    } else {
      setSelectedCategory(null);
    }

    const categoriesMapped = post.productsFound.map((el:any) => {
      if (el.category === "shoe") {
        return "shoes"
      }

      return el.category;
    })

    setApparelCategories(Array.from(categoriesMapped));
  }, [post.productMatches]);

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
  };

  if (post.productMatches.length === 0) {
    return (
      <View style={styles.noItemsBackground}>
        <View style={styles.noItemsFound}>
          <Text style={styles.noItemsText}>No Items Found</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
      >
        {apparelCategories.map((category: any, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.buttons,
              selectedCategory === category && styles.selectedButton,
            ]}
            onPress={() => handleSelectCategory(category)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === category && styles.selectedButtonText,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.background}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {post.productMatches.filter((item: any) => item.category === selectedCategory).length > 0 ? (
            post.productMatches
              .filter((item: any) => item.category === selectedCategory)
              .map((item: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate("Product", { item: item })}
                  activeOpacity={1}
                >
                  <View style={styles.responseContainer}>
                    <Image
                      source={{ uri: item.thumbnailUrl }}
                      style={styles.responseImage}
                    />
                    <Text style={styles.responseText}>{item.brand}</Text>
                    <Text style={styles.responseText}>
                      {item.price} {item.currency}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>No products found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",  
  },
  noItemsBackground: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  responseContainer: {
    padding: 8,
    backgroundColor: "white",
  },
  responseImage: {
    width: 150,
    height: 200,
    resizeMode: "cover",
  },
  responseText: {
    color: "black",
    fontSize: 17,
    marginTop: 2,
  },
  buttons: {
    paddingHorizontal: 25,
    paddingBottom: 2,
    paddingTop: 7,
    marginBottom: 4,
    backgroundColor: "white",
  },
  selectedButton: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  selectedButtonText: {
    color: "black",
    fontSize: 22,
  },
  buttonText: {
    color: "#707070",
    fontSize: 22,
  },
  categoryTabs: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 5,
  },
  noItemsText: {
    fontSize: 25,
    color: "grey",
    textAlign: "center",
  },
  noItemsFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 300,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  }, 
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20, 
  },
  placeholderText: {
    fontSize: 18,
    color: "gray",
  }
});

export default ShoppingList;
