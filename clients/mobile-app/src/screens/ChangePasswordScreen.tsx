import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";

export function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigation = useNavigation();

  const validatePassword = (password: any) => {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 8
    );
  };

  const handleUpdatePassword = () => {
    if (!validatePassword(newPassword)) {
      Alert.alert("Error", "Password does not meet complexity requirements.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "The new passwords do not match.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !user.email) {
      Alert.alert("Error", "No user is currently signed in.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            Alert.alert("Success", "Password updated successfully.", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          })
          .catch((error) => {
            console.error("Password update error:", error);
            Alert.alert("Error", "Failed to update password.");
          });
      })
      .catch((error) => {
        console.error("Re-authentication error:", error);
        Alert.alert("Error", "Current password is incorrect.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon width={32} height={32} />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, marginLeft: 35 }}>Change Password</Text>
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
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
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
