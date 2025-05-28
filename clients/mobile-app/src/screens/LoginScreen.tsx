import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import AnimatedBackground from "../components/AnimatedBackground";
import { useFonts } from "expo-font";

const windowHeight = Dimensions.get("window").height;

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

const auth = getAuth();

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [fontsLoaded] = useFonts({
    Comfortaa: require("/Users/patrik/Code/dripday/clients/mobile-app/assets/fonts/Comfortaa-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged in successfully");  
        navigation.navigate("Feed");
      })
      .catch((error) => {
        console.error("tjaba");
        console.error(error);
        setErrorMessage("There's no such user or the password is wrong.");
      });
  };

  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground rowImages={rowImages} />
      <View style={styles.blackCover} />
      <View style={{ marginTop: windowHeight / 4 }}>
        <Text style={styles.header}>dripday</Text>
      </View>
      <View style={styles.formContainer}>
        {errorMessage.length > 0 && (
          <Text style={styles.error}>{errorMessage}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]} // Added googleButton for styling
        >
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.textButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.signupText, styles.signupButton]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "Comfortaa",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  blackCover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  input: {
    width: "100%",
    height: 48,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 18,
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
  textButton: {
    marginTop: 40,
  },
  textButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    alignContent: "flex-end",
    marginTop: 15,
  },
  signupText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  signupButton: {
    fontWeight: "bold",
    color: "#007bff",
  },
  error: {
    color: "red",
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: "#db4437", 
  },
});

