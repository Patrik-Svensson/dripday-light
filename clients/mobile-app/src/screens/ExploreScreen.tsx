import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeState, setLikes } from "../store/features/likes/likesSlice";

import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";

import SearchFilterModal from "../components/SearchFilterModal";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSliders, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { auth } from "../config/firebaseConfig";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const API_URL = process.env.API_URL;

const { width, height } = Dimensions.get("window");
const aspectRatio = 529 / 258;

export type ExploreStackParamList = {
  ProductScreen: undefined; 
  PostView: { post: any };
  Styleboard: { styleboard: any }; 
};

export function ExploreScreen() {
  const dispatch = useDispatch();
  const likedPosts = useSelector((state: any) => state.likes);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<ExploreStackParamList>>();
  const animationValues = useRef(new Map()).current;

  const triggerLikeAnimation = (postId: any) => {
    if (!animationValues.has(postId)) {
      animationValues.set(postId, new Animated.Value(0));
    }
    const animation = animationValues.get(postId);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const handleSearch = async () => {
    try {
      const jsonContent = JSON.stringify({ searchText: searchQuery });

      const response = await axios.post(
        `${API_URL}:3000/api/v1/posts/search`,
        jsonContent,
        { headers: { "Content-Type": "application/json" } }
      );

      const fetchedPosts = response.data.posts;
      const sortedPosts = fetchedPosts.sort(
        (a: any, b: any) => b.score - a.score
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleHeartPress = async (postId: any, images: any) => {
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const isCurrentlyLiked = likedPosts[postId]?.isLiked || false;
    const newIsLiked: any = !isCurrentlyLiked;

    dispatch(toggleLikeState({ postId, isLiked: newIsLiked, image: images }));

    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .post(
        `${API_URL}/api/v1/posts/${postId}/like`,
        { postId, isLiked: newIsLiked },
        config
      )
      .catch((error) => console.error("Error updating likes:", error));

    if (newIsLiked) {
      triggerLikeAnimation(postId);
    }
  };

  const fetchPosts = async (page: any) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        const response = await axios({
          method: "get",
          url: `${API_URL}/api/v1/posts/feed/private`,
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedPosts: any = response.data.posts;

        setPosts([...posts, ...fetchedPosts]);
        const likesData = response.data.posts.reduce((acc: any, post: any) => {
          acc[post._id] = {
            isLiked: post.isLiked,
            image: post.image,
          };
          return acc;
        }, {});
        dispatch(setLikes(likesData));
        setHasMore(response.data.hasMore);
    } else {
        const response = await axios({
          method: "get",
          url: `${API_URL}/api/v1/posts/feed/public`,
        });

        const fetchedPosts: any = response.data.posts;

        // add the new posts to the existing posts
        setPosts([...posts, ...fetchedPosts]);
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, [dispatch]);

  const DOUBLE_PRESS_DELAY = 300;
  let lastTap: any = null;

  let lastTapTimeout: any = null;
  const handleTap = (item: any) => {
    const now = Date.now();
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      clearTimeout(lastTapTimeout);
      handleHeartPress(item._id, item.image);
    } else {
      lastTapTimeout = setTimeout(
        () => navigation.navigate("PostView", { post: item }),
        DOUBLE_PRESS_DELAY
      );
    }
    lastTap = now;
  };

  const loadMorePosts = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="What are you looking for?"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Ionicons name="ios-search" size={26} style={styles.searchIcon} />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilterModal}
        >
          <FontAwesomeIcon icon={faSliders} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.grayLine}></View>
      <FlatList
        data={posts}
        style={styles.photoGrid}
        numColumns={3}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleTap(item)}
            activeOpacity={1}
          >
            <Image source={{ uri: item.image.largeImageUrl }} style={styles.itemImage} />
            <Animated.View
              style={[
                styles.animatedHeart,
                {
                  transform: [
                    {
                      scale: animationValues.get(item._id)
                        ? animationValues.get(item._id).interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1.5],
                          })
                        : 1,
                    },
                  ],
                  opacity: animationValues.get(item._id)
                    ? animationValues.get(item._id)
                    : 0,
                },
              ]}
            >
              <FontAwesomeIcon icon={faHeart} size={50} color="red" />
            </Animated.View>
            <TouchableOpacity
              style={styles.gridHeartButton}
              onPress={(e) => {
                e.stopPropagation();
                handleHeartPress(item._id, item.image.largeImageUrl);
              }}
              activeOpacity={0.7}
            >
              <FontAwesomeIcon
                icon={faHeart}
                color={likedPosts[item._id]?.isLiked ? "red" : "white"}
                size={19}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 60 }}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
      />

      {isFilterModalVisible && <View style={styles.overlay} />}
      <SearchFilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
        setPosts={setPosts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginTop: 55,
    marginBottom: 2,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    paddingLeft: 45,
    fontSize: 19,
    borderColor: "#ddd",
    marginLeft: 3,
    marginRight: 10,
  },
  searchIcon: {
    position: "absolute",
    left: 18, // Adjust as needed to center the icon within the padding area
    color: "black",
  },
  filterButton: {
    padding: 10, // Adjust padding to ensure a larger touchable area
    marginRight: 20, // Keep your margin as is or adjust as needed
    alignItems: "center", // Center the icon inside the button
    justifyContent: "center", // Center the icon vertically
  },
  photoGrid: {
    width: "100%",
  },
  itemContainer: {
    width: width / 3 - 4, // Subtract margin space from the total width
    height: (width / 3 - 4) * aspectRatio, // Adjust height accordingly
    margin: 2, // Apply margin to each side of the container
  },
  itemImage: {
    width: "100%", // Cover the adjusted container width
    height: "100%", // Cover the adjusted container height
    resizeMode: "cover",
    borderRadius: 7
  },

  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  gridHeartButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    padding: 6,
  },
  button: {
    backgroundColor: "#007bff", // A pleasant blue background color
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Rounded corners
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },
  grayLine: {
    height: 1, // Thin line
    backgroundColor: "#ddd", // Gray color for the line
    width: "100%", // Ensures it spans the full width
    marginBottom: 3,
  },
  animatedHeart: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
