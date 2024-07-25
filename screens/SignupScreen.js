import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import axios from "axios";
import { API_URL } from "@env";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      navigation.navigate("Login");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
