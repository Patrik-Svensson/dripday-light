import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeState, setLikes } from "../store/features/likes/likesSlice";
import ShoppingList from "../components/ShoppingList";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import GridIcon from "../../assets/icons/grid.svg";
import FullscreenIcon from "../../assets/icons/fullscreen.svg";
import ShoppingcartIcon from "../../assets/icons/shopping-cart.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import axios from "axios";
import { auth } from "../config/firebaseConfig";
import AddStyleboardModal from "../components/AddStyleboardModal";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const API_URL = process.env.API_URL;

const { width } = Dimensions.get("window");
const aspectRatio = 529 / 258;

export function FeedScreen() {
  const likedPosts = useSelector((state: any) => state.likes);
  const [posts, setPosts]: any = useState([]);
  const [currentPost, setCurrentPost]: any = useState({});
  const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [user, setUser]: any = useState(null);
  const [isAddStyleboardModalVisible, setIsAddStyleboardModalVisible] =
    useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const shoppingListAnimation = useRef(new Animated.Value(300)).current;
  const styleboardModalAnimation = useRef(new Animated.Value(300)).current;
  const screenHeight = Dimensions.get("window").height - 60;

  const DOUBLE_PRESS_DELAY = 300;
  const PAGING_LIMIT = 10;

  const PUBLIC_FEED_URL = `${API_URL}/api/v1/posts/feed/public`;
  const PRIVATE_FEED_URL = `${API_URL}/api/v1/posts/feed/private`;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    let feedUrl = PUBLIC_FEED_URL + `?limit=${PAGING_LIMIT}`;
    let config = {};

    if (user) {
      feedUrl = PRIVATE_FEED_URL + `?limit=${PAGING_LIMIT}`;
      const token = await user.getIdToken();
      config = { headers: { Authorization: `Bearer ${token}` } };
    }

    try {
      const response = await axios.get(feedUrl, config);
      const fetchedPosts = response.data.posts.map((post: any) => ({
        ...post,
        heartScale: new Animated.Value(0),
      }));
 
      fetchedPosts.forEach((post: any) => {
        post.key = post.key + "-" + Math.random().toString();
      });

      setPosts((prevPosts: any) => [...prevPosts, ...fetchedPosts]);

      const test = response.data.posts.reduce((acc: any, post: any) => {
        acc[post._id] = { isLiked: post.isLiked, image: post.image };
        return acc;
      }, {});
      dispatch(setLikes(test));

    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const triggerLikeAnimation = (postId: any) => {
    const post: any = posts.find((p: any) => p._id === postId);
    if (!post) return;

    Animated.sequence([
      Animated.timing(post.heartScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(post.heartScale, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const slideAnimation = (animation: any, isVisible: any) => {
    Animated.timing(animation, {
      toValue: isVisible ? 0 : 400,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!isVisible) {
        setIsAddStyleboardModalVisible(false);
        setIsShoppingListVisible(false);
      }
    });
  };

  const lastTapTimeout: any = useRef(null);
  let lastTap: any = null;
  const handleTap = (item: any) => {
    const now = Date.now();
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      if (lastTapTimeout.current) {
        clearTimeout(lastTapTimeout.current);
        lastTapTimeout.current = null;
      }
      if (likedPosts[item._id]?.isLiked === false) {
        triggerLikeAnimation(item._id);
      }
      handleHeartPress(item._id);
    } else {
      lastTapTimeout.current = setTimeout(() => {
        if (!isGridView) {
          toggleShoppingList();
        }

        if (isGridView) {
          navigation.navigate("PostView", { post: item });
        }
      }, DOUBLE_PRESS_DELAY);
    }
    lastTap = now;
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0 && viewableItems[0].item) {
      const currentVisiblePost = viewableItems[0].item;
      setCurrentPost(currentVisiblePost);
    }
  }, []);

  const toggleShoppingList = () => {
    if (isShoppingListVisible) {
      slideAnimation(shoppingListAnimation, false);
    } else {
      if (isAddStyleboardModalVisible) {
        slideAnimation(styleboardModalAnimation, false);
      }
      setIsShoppingListVisible(true);
      slideAnimation(shoppingListAnimation, true);
    }
  };

  const toggleStyleboardList = () => {
    if (isAddStyleboardModalVisible) {
      slideAnimation(styleboardModalAnimation, false);
    } else {
      if (isShoppingListVisible) {
        slideAnimation(shoppingListAnimation, false);
      }
      setIsAddStyleboardModalVisible(true);
      slideAnimation(styleboardModalAnimation, true);
    }
  };

  const handleHeartPress = async (postId: any) => {
    const post: any = posts.find((p: any) => p._id === postId);
    if (!post) return;

    const isCurrentlyLiked = likedPosts[postId]?.isLiked || false;
    const newIsLiked = !isCurrentlyLiked;

    dispatch(
      toggleLikeState({ postId, isLiked: newIsLiked, image: post.image })
    );

    try {
      if (!user) return;

      const token = await user.getIdToken();
      await axios.post(
        `${API_URL}/api/v1/posts/${postId}/likes`,
        { isLiked: newIsLiked },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const loadMorePosts = () => {
    fetchPosts();
  };

const renderPost = ({ item }: { item: any }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleTap(item)}>
      <View
        style={
          isGridView
            ? styles.gridImageContainer
            : { height: screenHeight, position: "relative" }
        }
      >
        <Image
          source={{ uri: item.image.hugeImageUrl }}
          style={[
            isGridView ? styles.gridImage : styles.image,
            isGridView && { borderRadius: 10 },
          ]}
        />
        <Animated.View
          style={[
            styles.animatedHeart,
            {
              transform: [
                {
                  scale: item.heartScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.5],
                  }),
                },
              ],
              opacity: item.heartScale,
            },
          ]}
        >
          <FontAwesomeIcon icon={faHeart} size={80} color="red" />
        </Animated.View>
        {isGridView && (
          <TouchableOpacity
            style={styles.gridHeartButton}
            onPress={() => handleHeartPress(item._id)}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={likedPosts[item._id]?.isLiked ? "red" : "white"}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

  return (
    <>
      <View style={{ height: screenHeight, backgroundColor: "white" }}>
        {!isGridView && (
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => handleHeartPress(currentPost._id)}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={likedPosts[currentPost._id]?.isLiked ? "red" : "white"}
              size={31}
            />
          </TouchableOpacity>
        )}
        {!isGridView && (
          <TouchableOpacity
            style={styles.shoppingcartButton}
            onPress={toggleShoppingList}
            activeOpacity={1}
          >
            <ShoppingcartIcon width={38} height={38} />
          </TouchableOpacity>
        )}
        {!isGridView && (
          <TouchableOpacity
            style={styles.addStyleboardButton}
            onPress={toggleStyleboardList}
            activeOpacity={0.7}
          >
            <PlusIcon width={33} height={33} fill="white" />
          </TouchableOpacity>
        )}

        {isGridView && (
          <TouchableOpacity
            style={styles.fullscreenButton}
            onPress={() => setIsGridView(false)}
          >
            <FullscreenIcon
              width={31}
              height={31}
              fill="white"
            />
          </TouchableOpacity>
        )}

        {!isGridView && (
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => {
              if (isShoppingListVisible) {
                slideAnimation(shoppingListAnimation, false);
              }
              if (isAddStyleboardModalVisible) {
                slideAnimation(styleboardModalAnimation, false);
              }
              setIsGridView(true);
            }}
          >
            <GridIcon
              width={31}
              height={31}
              fill={isGridView ? "black" : "white"}
            />
          </TouchableOpacity>
        )}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.key}
          key={isGridView ? "grid" : "list"}
          numColumns={isGridView ? 2 : 1}
          horizontal={false}
          pagingEnabled={!isGridView}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          contentContainerStyle={{
            paddingTop: isGridView ? 48 : 0,
          }}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.2}
        />

        {isAddStyleboardModalVisible && (
          <Animated.View
            style={[
              styles.shoppingListContainer,
              {
                transform: [{ translateY: styleboardModalAnimation }],
              },
            ]}
          >
            <AddStyleboardModal
              post={currentPost}
              closeModal={() => slideAnimation(styleboardModalAnimation, false)}
            />
          </Animated.View>
        )}
        {isShoppingListVisible && (
          <Animated.View
            style={[
              styles.shoppingListContainer,
              {
                transform: [{ translateY: shoppingListAnimation }],
              },
            ]}
          >
            <ShoppingList post={currentPost} />
          </Animated.View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  gridImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width / 2 - 4,
    height: (width / 2 - 4) * aspectRatio,
    margin: 2,
  },
  gridImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heartButton: {
    position: "absolute",
    top: 150,
    right: 18,
    zIndex: 2,
  },
  shoppingcartButton: {
    position: "absolute",
    top: 46,
    right: 18,
    zIndex: 2,
  },
  gridHeartButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
    padding: 8,
  },
  addStyleboardButton: {
    position: "absolute",
    top: 99,
    right: 18,
    zIndex: 2,
  },
  shoppingListContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  fullscreenButton: {
    position: "absolute",
    top: 50,
    left: 18,
    zIndex: 2,
  },
  gridButton: {
    position: "absolute",
    top: 50,
    left: 18,
    zIndex: 2,
  },
  animatedHeart: {
    position: "absolute",
    zIndex: 3,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
