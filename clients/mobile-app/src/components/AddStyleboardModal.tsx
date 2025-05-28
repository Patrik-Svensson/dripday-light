import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setReduxStyleboards,
  addPostToStyleboard,
} from "../store/features/styleboards/styleboardSlice";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { auth } from "../config/firebaseConfig";
import PlusIcon from "../../assets/icons/plus.svg";

interface AddStyleboardModalProps {
  post: any;
  closeModal: () => void;
}

const AddStyleboardModal: React.FC<AddStyleboardModalProps> = ({
  post,
  closeModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const styleboards = useSelector((state: any) => state.styleboards);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStyleboards = async () => {
      setIsLoading(true);
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You need to be logged in to see styleboards.");
        setIsLoading(false);
        return;
      }
      const token = await user.getIdToken();

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/styleboards/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setReduxStyleboards(response.data));
      } catch (error) {
        console.error("Error fetching styleboards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStyleboards();
  }, []);

  const addPost = async (item: any) => {
    const user = auth.currentUser;
    if (!user) {
      new Error("No user is signed in.");
      return;
    }
    const token = await user.getIdToken();

    try {
      await axios.post(
        `http://localhost:3000/api/v1/styleboards/${item._id}/posts`,
        { styleboardId: item._id, postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        addPostToStyleboard({
          styleboardId: item._id,
          post: { id: post.id, image: post.image },
        })
      );
      closeModal();
    } catch (error) {
      console.error("Error adding post to styleboard:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add To Styleboard</Text>
      {isLoading ? (
        <Text>Loading styleboards...</Text>
      ) : styleboards.length === 0 ? (
        <View>
          <Text style={styles.emptyListText}>No Styleboards</Text>
        </View>
      ) : (
        <FlatList
          data={styleboards}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => addPost(item)}>
              <View style={styles.imageTextContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <PlusIcon
                style={styles.plusIcon}
                width={24}
                height={24}
                fill="black"
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageTextContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 24,
    textAlign: "center",
  },
  list: {
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 22,
    marginLeft: 15,
    alignSelf: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  storyboardImage: {
    width: 50,
    height: 50,
  },
  plusIcon: {
    marginRight: 10,
    alignSelf: "center",
  },
  emptyListText: { fontSize: 20, color: "gray", paddingBottom: 50 },
  emptyListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddStyleboardModal;
