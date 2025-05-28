import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AnimatedBackground from "../components/AnimatedBackground";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

export function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setConfirmationMessage(
          "Please check your email to reset your password."
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        console.error("Password reset error:", errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground rowImages={rowImages} />
      <View style={styles.blackCover} />
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        {errorMessage.length > 0 && (
          <Text style={styles.error}>{errorMessage}</Text>
        )}
        {confirmationMessage.length > 0 && (
          <Text style={styles.confirmation}>{confirmationMessage}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    paddingLeft: 14,
    paddingRight: 14,
    borderColor: "#c7c7cc",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#007aff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blackCover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  buttonText: {
    fontSize: 17,
    color: "#ffffff",
    fontWeight: "600",
  },
  error: {
    fontSize: 14,
    color: "#ff3b30",
    marginBottom: 10,
  },
  confirmation: {
    fontSize: 14,
    color: "#34c759",
    marginBottom: 10,
  },
});
