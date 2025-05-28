import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import { auth } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  removeStyleboard,
  changeNameStyleboard,
} from "../store/features/styleboards/styleboardSlice";

interface StyleboardEditModalProps {
  closeModal: () => void;
  styleboard: any;
}

const StyleboardEditModal: React.FC<StyleboardEditModalProps> = ({
  closeModal,
  styleboard,
}) => {
  const [inputStyleboardName, setInputStyleboardName] = useState(
    styleboard.name
  );

  const dispatch = useDispatch();

  const navigator = useNavigation();

  const handleStyleboardNameChange = (text: any) => {
    setInputStyleboardName(text);
  };

  const deleteStyleboard = async () => {
    const user = auth.currentUser;
    if (!user) {
      new Error("No user is signed in.");
      return;
    }
    const token = await user.getIdToken();
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/styleboards/${styleboard._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      closeModal();
      dispatch(removeStyleboard(styleboard._id));
      navigator.goBack();
    } catch (error) {
      console.error("Error deleting styleboard:", error);
    }
  };

  const renameStyleboard = async () => {
    const user = auth.currentUser;
    if (!user) {
      new Error("No user is signed in.");
      return;
    }
    const token = await user.getIdToken();
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/styleboards/${styleboard._id}`,
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
      closeModal();
    } catch (error) {
      console.error("Error renaming styleboard:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Edit Styleboard</Text>
      <View style={styles.changeNameContainer}>
        <TextInput
          style={styles.modalText}
          onChangeText={handleStyleboardNameChange}
          value={inputStyleboardName}
          placeholder="Enter Styleboard Name"
        />

        <TouchableOpacity
          style={styles.changeNameButton}
          onPress={renameStyleboard}
        >
          <Text style={styles.buttonText}>Rename</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={deleteStyleboard} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "gray",
    height: 230,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
  },
  changeNameContainer: {
    flexDirection: "row",
    marginBottom: 30,
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  changeNameButton: {
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "black",
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
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
  headerText: {
    fontSize: 27,
    marginBottom: 18,
    marginTop: 15,
    marginLeft: 20,
    width: "100%",
    fontWeight: "300",
  },
});

export default StyleboardEditModal;
