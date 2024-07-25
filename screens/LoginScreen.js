import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, login: loginUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await loginUser(email, password); // Call loginUser function with email and password
      console.log(user);
      navigation.navigate("Home");
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Error details:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Signup")}
        style={styles.button}
      >
        Don't have an account? Sign Up
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
