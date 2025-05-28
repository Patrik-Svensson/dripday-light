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
import { useDispatch } from "react-redux";
import { addOneStyleboard } from "../store/features/styleboards/styleboardSlice";

interface CreateStyleboardModalProps {
  closeModal: () => void;
}

const CreateStyleboardModal: React.FC<CreateStyleboardModalProps> = ({
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [styleboardName, setStyleboardName] = useState("");

  const handleStyleboardNameChange = (text: any) => {
    setStyleboardName(text);
  };

  const createStyleboard = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is signed in.");
      return;
    }
    const token = await user.getIdToken();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/styleboards",
        { name: styleboardName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(addOneStyleboard(response.data));
      closeModal();
    } catch (error) {
      console.error("Error creating styleboard:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create Styleboard</Text>
      <TextInput
        style={styles.modalText}
        onChangeText={handleStyleboardNameChange}
        value={styleboardName}
        placeholder="Enter Styleboard Name"
      />
      <TouchableOpacity onPress={createStyleboard} style={styles.button}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "gray",
    height: 240,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
  },
  modalText: {
    padding: 10,
    alignSelf: "center",
    width: "90%",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  button: {
    backgroundColor: "black",
    width: "90%",
    marginTop: 50,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: { color: "white", fontSize: 20 },
  headerText: {
    fontSize: 27,
    marginBottom: 25,
    marginTop: 15,
    marginLeft: 20,
    width: "100%",
    fontWeight: "300",
  },
});

export default CreateStyleboardModal;
