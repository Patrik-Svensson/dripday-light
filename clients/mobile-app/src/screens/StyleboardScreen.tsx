import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import LeftArrowIcon from "../../assets/icons/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis, faTimes } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  removeStyleboard,
  changeNameStyleboard,
  removePostFromStyleboard,
} from "../store/features/styleboards/styleboardSlice";

const aspectRatio = 1249 / 620;

const API_URL = process.env.API_URL;

export type StyleboardStackParamList = {
  ProductScreen: undefined;
  PostView: { post: any };
  Styleboard: { styleboard: any };
};

export const StyleboardScreen = ({ route }: any) => {
  const styleboards = useSelector((state: any) => state.styleboards);
  const styleboard = styleboards.find(
    (styleboard: any) => styleboard._id === route.params.styleboard._id
  );

  const navigator =
    useNavigation<NativeStackNavigationProp<StyleboardStackParamList>>();
  const dispatch = useDispatch();

  const [isStyleboardModalVisible, setIsStyleboardModalVisible] =
    useState(false);
  const [inputStyleboardName, setInputStyleboardName] = useState(
    styleboard ? styleboard.name : ""
  );

  const slideAnim = useRef(new Animated.Value(300)).current;

  const toggleStyleboardModal = () => {
    if (isStyleboardModalVisible) {
      slideOut();
    } else {
      setIsStyleboardModalVisible(true);
      slideIn();
    }
  };

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
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

  const removeImage = async (postId: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user is signed in.");
        return;
      }
      const token = await user.getIdToken();
      await axios.delete(
        `${API_URL}/api/v1/styleboards/${styleboard._id}/posts/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        removePostFromStyleboard({ styleboardId: styleboard._id, postId })
      );
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const renderGridItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigator.navigate("PostView", { post: item })}
      >
        <Image
          source={{ uri: item.image.largeImageUrl }}
          style={styles.gridImage}
          onError={(error) => console.error("Image loading error:", error)}
        />
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeImage(item._id)}
        >
          <FontAwesomeIcon icon={faTimes} size={20} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const handleStyleboardNameChange = (text: any) => {
    setInputStyleboardName(text);
  };

  const deleteStyleboard = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is signed in.");
      return;
    }
    const token = await user.getIdToken();
    try {
      await axios.delete(
        `${API_URL}/api/v1/styleboards/${styleboard._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toggleStyleboardModal();
      dispatch(removeStyleboard(styleboard._id));
      navigator.goBack();
    } catch (error) {
      console.error("Error deleting styleboard:", error);
    }
  };

  const renameStyleboard = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is signed in.");
      return;
    }
    const token = await user.getIdToken();
    try {
      await axios.patch(
        `${API_URL}/api/v1/styleboards/${styleboard._id}`,
        { name: inputStyleboardName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      changeNameStyleboard({
        styleboardId: styleboard._id,
        name: inputStyleboardName,
      });
      dispatch(
        changeNameStyleboard({
          styleboardId: styleboard._id,
          name: inputStyleboardName,
        })
      );
      toggleStyleboardModal();
    } catch (error) {
      console.error("Error renaming styleboard:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          marginBottom: 1,
          borderColor: "#ddd",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigator.goBack();
            }}
          >
            <LeftArrowIcon width={29} height={29} />
          </TouchableOpacity>

          <Text style={styles.headerText}>
            {styleboard ? styleboard.name : "null"}
          </Text>
          <TouchableOpacity onPress={() => toggleStyleboardModal()}>
            <FontAwesomeIcon
              style={{ marginRight: 20, marginTop: 5 }}
              icon={faEllipsis}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 3,
          }}
        >
          <Text style={{ fontSize: 16, color: "#6b6b6b" }}>
            {styleboard ? styleboard.posts.length + " " : "null "}
            Styles
          </Text>
        </View>
      </View>
      <FlatList
        data={styleboard ? styleboard.posts : []}
        renderItem={renderGridItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      {isStyleboardModalVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={slideOut} // Close modal when tapping outside
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
            <View style={styles.modalContainer}>
              <Text
                style={{
                  fontSize: 27,
                  marginBottom: 18,
                  marginTop: 15,
                  marginLeft: 20,
                  width: "100%",
                  fontWeight: "300",
                }}
              >
                Edit Styleboard
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 30,
                  width: "90%",
                  justifyContent: "space-between",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={styles.modalText}
                  onChangeText={handleStyleboardNameChange}
                  value={inputStyleboardName}
                  placeholder="Enter Styleboard Name"
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignContent: "center",
                    paddingHorizontal: 10,
                  }}
                  onPress={renameStyleboard}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>Rename</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={deleteStyleboard}
                style={{
                  backgroundColor: "black",
                  width: "90%",
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "white",
  },
  headerText: {
    marginTop: 2,
    fontSize: 25,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 35,
    marginTop: 5,
    marginLeft: 17,
    height: 35,
    zIndex: 1,
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
  styleboardModalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  grid: {
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  gridItem: {
    flex: 0,
    width: "50%",
    aspectRatio: 1 / aspectRatio,
    padding: 2,
  },
  gridImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 2,
  },
  modalContainer: {
    backgroundColor: "white",
    borderColor: "gray",
    height: 230,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
  },
  modalText: {
    padding: 10,
    alignSelf: "center",
    fontSize: 20,
    flex: 1,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
