import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useFonts } from "expo-font";

import AnimatedBackground from "../components/AnimatedBackground";

const API_URL = process.env.API_URL;

const rowImages = [
  [
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_fashion_ad_in_HM_style_c964d473-bc73-48df-ba29-4be90d7b01a3.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_fashion_ad_in_Shein_style_4c74f2f8-93d0-40b6-9698-d882b54737f2.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_fashion_ad_in_Shein_style_abfa1f2c-9988-476f-97b3-0bdc68d66279.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_full-body_fashion_ad_of_a_young_attractive_female_Sca_ce9b6534-5303-4e23-969d-ded7deeb3455.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_full-body_fashion_ad_with_a_young_attractive_female_C_2f90fe45-d848-4bf1-8291-7a6198ff3d5b.png"),
  ],
  [
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_fashion_ad_in_Zara_style_708f74e1-3c85-4abf-8817-3fb05119f16a.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_full-body_fashion_ad_in_Maison_Kitsune_style._The_fem_d9afa8c3-6425-4b21-ad70-6dad1c5b0ac8.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_full-body_fashion_ad_of_a_young_attractive_female_Sca_ce9b6534-5303-4e23-969d-ded7deeb3455.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_summer_fashion_ad_in_Maison_Kitsune_style._The_attrac_3ec709d3-9bf5-4202-90b9-14083181e897.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_fashion_ad_with_a_young_attractive_female_Italian_mod_e4b89dee-a554-4795-8946-22969b95434c-2.png"),
  ],
  [
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_summer_fashion_ad_in_Wes_Anderson_style._The_attracti_54d48d91-fcc0-4cdd-9c36-8433f3f11d89.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_fashion_ad_in_IKEA_style_e516a7e5-ae34-4171-8b90-de2b33a6f8e9.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_full-body_winter_fashion_ad_taken_in_Seoul_with_an_at_6cc7af07-f8d3-4167-8fe9-1a8a52643617.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_fashion_ad_taken_in_Paris_with_an_attractive_female_m_e2735c9c-6e89-469b-b9cc-15fa844c3de3.png"),
    require("/Users/patrik/Code/dripday/clients/mobile-app/assets/login_images/patsby._A_full-body_fashion_ad_with_a_Korean_female_model_taken_2f7cfabf-3e09-4422-b036-37863cf911b5.png"),
  ],
];

const windowHeight = Dimensions.get("window").height;

export const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Comfortaa: require("/Users/patrik/Code/dripday/clients/mobile-app/assets/fonts/Comfortaa-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; // You can use a loading spinner or any placeholder component here
  }

  const isValidEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPassword = (password: any) => {
    return (
      /[A-Z]/.test(password) && 
      /[a-z]/.test(password) && 
      /[0-9]/.test(password) && 
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 8 
    );
  };

  const handleSignUp = async () => {
    console.log("Signing up...");
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
      );
      return;
    }
    console.log("Is valid password");
    console.log("Password is valid");

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "The passwords do not match.");
      return;
    }
    console.log("Passwords match");

    console.log("Signing up...");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken(); 

        try {
          await axios.post(
            `${API_URL}/api/v1/users/`,
            {
              uid: user.uid,
              email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("User created in backend");
        } catch (error) {
          console.error("Error creating user in backend:", error);
        }
      })
      .then(() => {
        Alert.alert(
          "Signup Successful",
          "Your account has been created. Please check your email to verify your account.",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      })
      .catch((error) => {
        let errorMessage;
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "The email address is already in use by another account.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is not valid.";
            break;
          case "auth/weak-password":
            errorMessage = "The password is too weak.";
            break;
          default:
            errorMessage = error.message;
        }
        Alert.alert("Signup Failed", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground rowImages={rowImages} />
      <View style={styles.blackCover} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backArrow}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
      </TouchableOpacity>
      <View style={{ marginTop: windowHeight / 4 }}>  
        <Text style={styles.header}>dripday</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    color: "white"
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 16,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#fff",
    elevation: 5,
    fontSize: 18,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
    elevation: 5,
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  blackCover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#666",
  },
  loginButton: {
    color: "#4285F4",
    fontWeight: "bold",
  },
});
