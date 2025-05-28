import React, { useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import ShoppingList from "../components/ShoppingList";
import axios from "axios";
import { auth } from "../config/firebaseConfig";
import { Animated } from "react-native";
import ShoppingcartIcon from "../../assets/icons/shopping-cart.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import AddStyleboardModal from "../components/AddStyleboardModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeState } from "../store/features/likes/likesSlice";

const API_URL = process.env.API_URL;

export const PostViewScreen = ({ route }: any) => {
  const { post } = route.params;
  const navigation = useNavigation();
  const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);
  const dispatch = useDispatch();
  const likedPosts = useSelector((state: any) => state.likes);
  const [isAddStyleboardModalVisible, setIsAddStyleboardModalVisible] =
    useState(false);

  const shoppingListAnimation = useRef(new Animated.Value(300)).current;
  const styleboardModalAnimation = useRef(new Animated.Value(300)).current;

  const DOUBLE_PRESS_DELAY = 300;
  let lastTap: any = null;

  const lastTapTimeout: any = useRef(null);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      if (lastTapTimeout.current) {
        clearTimeout(lastTapTimeout.current);
        lastTapTimeout.current = null;
      }
      handleHeartPress();
    } else {
      lastTapTimeout.current = setTimeout(() => {
        toggleShoppingList();
      }, DOUBLE_PRESS_DELAY);
    }
    lastTap = now;
  };

  const heartScale = useRef(new Animated.Value(0)).current;

  const triggerLikeAnimation = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHeartPress = async () => {
    const item = post;
    const newIsLiked = !likedPosts[item._id]?.isLiked;

    dispatch(
      toggleLikeState({
        postId: post._id,
        isLiked: newIsLiked,
        image: post.image,
      })
    );

    const user = auth.currentUser;
    if (!user) {
      new Error("No user is signed in.");
      return;
    }
    const token = await user.getIdToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      postId: post._id,
      isLiked: newIsLiked,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/posts/${post._id}/likes`,
        data,
        config
      );
      // Trigger the animation only if the post is being liked and the server update was successful
      if (newIsLiked) {
        triggerLikeAnimation();
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
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

  const slideAnimationStyleboard = (animation: any, isVisible: any) => {
    Animated.timing(animation, {
      toValue: isVisible ? 0 : 400,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!isVisible) {
        setIsAddStyleboardModalVisible(false);
      }
    });
  };

  const slideAnimationShopping = (animation: any, isVisible: any) => {
    Animated.timing(animation, {
      toValue: isVisible ? 0 : 400,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!isVisible) {
        setIsShoppingListVisible(false);
      }
    });
  };

  const toggleShoppingList = () => {
    if (isShoppingListVisible) {
      slideAnimationShopping(shoppingListAnimation, false);
    } else {
      if (isAddStyleboardModalVisible) {
        slideAnimationStyleboard(styleboardModalAnimation, false);
      }
      setIsShoppingListVisible(true);
      slideAnimationShopping(shoppingListAnimation, true);
    }
  };

  const toggleStyleboardList = () => {
    if (isAddStyleboardModalVisible) {
      slideAnimationStyleboard(styleboardModalAnimation, false);
    } else {
      if (isShoppingListVisible) {
        slideAnimationShopping(shoppingListAnimation, false);
      }
      setIsAddStyleboardModalVisible(true);
      slideAnimationStyleboard(styleboardModalAnimation, true);
    }
  };

  const handleAddStyleboard = () => {
    toggleStyleboardList();
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const screenHeight = Dimensions.get("window").height - 50;

  return (
    <View style={{ height: screenHeight }}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleBackButton}
        activeOpacity={0.7}
      >
        <FontAwesomeIcon icon={faTimes} size={25} />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.animatedHeart,
          {
            transform: [
              {
                scale: heartScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1.5], // Adjust based on your design
                }),
              },
            ],
            opacity: heartScale, // Fade in and out
          },
        ]}
      >
        <FontAwesomeIcon icon={faHeart} size={80} color="red" />
      </Animated.View>
      <TouchableOpacity
        style={styles.heartButton}
        onPress={handleHeartPress}
        activeOpacity={0.7}
      >
        <FontAwesomeIcon icon={faHeart} size={31} color={likedPosts[post._id]?.isLiked ? "red" : "white"}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shoppingcartButton}
        onPress={toggleShoppingList}
      >
        <ShoppingcartIcon width={38} height={38} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addStyleboardButton}
        onPress={() => handleAddStyleboard()}
        activeOpacity={0.7}
      >
        <PlusIcon width={33} height={33} fill="white" />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={handleTap}
        style={{ flex: 1 }}
      >
        <Image
          source={{ uri: post.image.hugeImageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>

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
            post={post}
            closeModal={() => slideAnimation(styleboardModalAnimation, false)}
          />
        </Animated.View>
      )}
      {isShoppingListVisible && (
        <Animated.View
          style={[
            styles.shoppingListOverlay,
            {
              // Transform used for animation
              transform: [{ translateY: shoppingListAnimation }],
            },
          ]}
        >
          <ShoppingList post={post} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  shoppingListOverlay: {
    position: "absolute",
    width: "100%",
    bottom: 10,
  },

  deleteButton: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 2,
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
  addStyleboardButton: {
    position: "absolute",
    top: 99,
    right: 18,
    zIndex: 2,
  },
  animatedHeart: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 2,
  },
  shoppingListContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  icon: {
    color: "white",
  },
});

export default PostViewScreen;
