import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebaseConfig";
import Dialog from "react-native-dialog";
import RightArrowIcon from "../../assets/icons/chevron.svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import axios from "axios";

const API_URL = process.env.API_URL;

const expectedConfirmationText = "DELETE";

export function SettingsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const showDeleteConfirmDialog = () => {
    setDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (confirmText.toUpperCase() === expectedConfirmationText) {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("No user is signed in.");
        }
        const token = await user.getIdToken();

        await axios({
          method: "delete",
          url: `${API_URL}/api/v1/users/${user.uid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await signOut(getAuth());
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    } else {
      alert("Incorrect confirmation text.");
    }
    setDialogVisible(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user?.email === null) {
        console.error("No user is signed in.");
        return;
      }
      if (user) {
        setEmail(user.email);
      } else {
        console.error("No user is signed in.");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleChangePassword = () => navigation.navigate("Change Password");
  const handleChangeEmail = () => navigation.navigate("Change Email");

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          marginBottom: 30,
          width: "90%",
          alignSelf: "center",
        }}
      >
        Settings
      </Text>

      <TouchableOpacity
        style={{ width: "90%", alignSelf: "center" }}
        onPress={handleChangeEmail}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.placeholder}>{email}</Text>
          <RightArrowIcon width={18} height={18} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ width: "90%", alignSelf: "center" }}
        onPress={handleChangePassword}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.placeholder}>Tap to change</Text>
          <RightArrowIcon width={18} height={18} />
        </View>
      </TouchableOpacity>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={showDeleteConfirmDialog}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Account Delete</Dialog.Title>
        <Dialog.Description>
          Enter "DELETE" to confirm your account deletion.
        </Dialog.Description>
        <Dialog.Input onChangeText={setConfirmText} />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Delete" onPress={handleConfirmDelete} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: 60,
    backgroundColor: "white",
    alignContent: "center",
    width: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    flex: 1, // Adjust as needed to allocate space for the label
  },
  detailView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2, // Adjust as needed for space allocation
  },
  detailText: {
    marginRight: 10,
    fontSize: 18,
  },
  bottomButtons: {
    position: "absolute", // Position the container absolutely within its parent
    bottom: 45, // Distance from the bottom of the parent container. Adjust as needed.
    left: 0,
    right: 0,
    alignItems: "center",
  },

  placeholder: {
    marginRight: 10,
    fontSize: 16,
  },
  changeButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  logoutButton: {
    backgroundColor: "black",
    padding: 15,
    marginTop: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#ff3b30", // Same color as logout for consistency
    padding: 15,
    marginTop: 10,
    marginBottom: 30, // Add some bottom margin
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
