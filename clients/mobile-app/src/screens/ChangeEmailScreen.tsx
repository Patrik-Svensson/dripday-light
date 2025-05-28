import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { getAuth, updateEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";

export function ChangeEmailScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const navigation = useNavigation();

  const handleUpdateEmail = async () => {
    const auth = getAuth();

    if (auth.currentUser === null) {
      Alert.alert("Error", "No user is signed in.");
      return;
    }

    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        Alert.alert("Email updated successfully!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error updating email: ", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon width={32} height={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, marginLeft: 60 }}>Change Email</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          flex: 1,
          paddingTop: 90,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Email"
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateEmail}>
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    width: "90%",
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  header: {
    paddingTop: 40,
    width: "100%",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    marginTop: 40,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
