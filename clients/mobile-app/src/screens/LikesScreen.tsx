import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReduxStyleboards } from "../store/features/styleboards/styleboardSlice";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
  Animated,
} from "react-native";
import axios from "axios";
import { auth } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import CreateStyleboardModal from "../components/CreateStyleboardModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

const PlusIcon = require("../../assets/icons/plus.svg").default;
const { width } = Dimensions.get("window");
const aspectRatio = 529 / 258;

const API_URL = process.env.API_URL;

const screenHeight = Dimensions.get("window").height - 60;

export const LikesScreen = () => {
  const likedPosts = useSelector((state: any) => state.likes);
  const styleboards = useSelector((state: any) => state.styleboards);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("photos");
  const [isStyleboardModalVisible, setIsStyleboardModalVisible] =
    useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const newPost: any = Object.entries(likedPosts)
      .filter(([postId, likeData]: [any, any]) => likeData.isLiked)
      .map(([postId, likeData]) => likeData);

    setPosts(newPost);

  }, [likedPosts]);

  useEffect(() => {
    const fetchPosts = async () => {
      const user: any = auth.currentUser;
      const token = await user.getIdToken();

      try {
        const response = await axios.get(
          `${API_URL}/api/v1/users/likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        response.data.reduce((acc: any, post: any) => {
          acc[post._id] = {
            isLiked: post.isLiked,
            image: post.image,
          };
          return acc;
        }, {});

        setPosts(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user is signed in.");
        return;
      }
      const token = await user.getIdToken();
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/styleboards/with-posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setReduxStyleboards(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 60,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsStyleboardModalVisible(false));
  };

  const toggleStyleboardModal = () => {
    if (isStyleboardModalVisible) {
      slideOut();
    } else {
      setIsStyleboardModalVisible(true);
      slideIn();
    }
  };

  return (
    <>
      <StatusBar hidden />
      <View
        style={{
          paddingTop: 50,
          backgroundColor: "white",
          height: screenHeight,
        }}
      >
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("photos")}
            style={[styles.tab, activeTab === "photos" && styles.activeTab]}
          >
            <Text style={styles.tabText}>Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("styleboards")}
            style={[
              styles.tab,
              activeTab === "styleboards" && styles.activeTab,
            ]}
          >
            <Text style={styles.tabText}>Styleboards</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {activeTab === "photos" && (
            <FlatList
              data={posts}
              style={styles.photoGrid}
              numColumns={3}
              keyExtractor={(item: any) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() =>
                    navigation.navigate("PostView", { post: item })
                  }
                >
                  <Image
                    source={{ uri: item.image.largeImageUrl }}
                    style={styles.itemImage}
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 60 }}
            />
          )}

          {activeTab === "styleboards" && (
            <View style={{ flex: 1, width: "100%" }}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={toggleStyleboardModal}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PlusIcon width={28} height={28} />
                </View>
                <Text style={styles.addButtonText}>New Styleboard</Text>
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 20, marginHorizontal: 10, marginTop: 10, fontWeight: "bold", marginBottom: 0 }}>
                  All Styleboards
                </Text>
                <FlatList
                  data={styleboards}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.styleboardItem}
                      onPress={() =>
                        navigation.navigate("Styleboard", {
                          styleboard: item,
                        })
                      }
                    >
                      <Text style={styles.styleboardText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={{ paddingBottom: 60, paddingTop: 10 }}
                />
              </View>
            </View>
          )}
        </View>
        {isStyleboardModalVisible && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPressOut={slideOut}
          >
            <Animated.View
              style={[
                styles.styleboardModalContainer,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
              onStartShouldSetResponder={() => true} // Prevent touch events from bubbling to the overlay
            >
              <CreateStyleboardModal closeModal={slideOut} />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
  },
  itemContainer: {
    width: width / 3 - 4,
    height: (width / 3 - 4) * aspectRatio,
    margin: 2,
  },
  photoGrid: {
    width: "100%",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 7
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 3,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  styleboardModalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end", // Aligns the modal at the bottom
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  tabText: {
    fontSize: 25,
    color: "black",
    fontWeight: "300",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20, // Correct property for the top-left corner
    borderTopRightRadius: 20, // Correct property for the top-right corner
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  styleboardItem: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 13,
    marginHorizontal: 10,
    alignItems: "center",
    borderColor: "#ddd",
    borderBottomWidth: 1,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 20,
    marginLeft: 2,
    color: "#333",
  },
  styleboardText: {
    fontSize: 20,
    marginLeft: 10, // Add some space between the image and the text
    color: "#333",
  },
  styleboardImage: {
    width: 50, // Set a fixed width for the image
    height: 50, // Set a fixed height for the image
  },
});

export default LikesScreen;
