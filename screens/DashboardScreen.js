import React, { useContext, useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "@env";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DashboardScreen({ navigation }) {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const successRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    setSuccess(null); // Reset success state
    try {
      await axios.put(`${API_URL}/update`, {
        name,
        email,
        password,
      });
      setSuccess(true);
      if (successRef.current) successRef.current.bounceIn();
      // alert("Details updated successfully");
    } catch (error) {
      console.error(error);
      setSuccess(false);
      if (errorRef.current) errorRef.current.bounceIn();
      // alert("Update failed. Please try again.");
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="blue" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No user data found. Please log in again.
        </Text>
        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Login
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user[0].name}!</Text>
      <Text style={styles.text}>Please fill in the updated details.</Text>
      <TextInput
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
      {loading ? (
        <ActivityIndicator animating={true} size="large" color="blue" />
      ) : (
        <Button mode="contained" onPress={handleUpdate} style={styles.button}>
          Update Details
        </Button>
      )}
      <Button mode="outlined" onPress={logout} style={styles.button}>
        Logout
      </Button>
      {success !== null && (
        <Animatable.View
          ref={success ? successRef : errorRef}
          style={styles.iconContainer}
        >
          <Icon
            name={success ? "check-circle" : "times-circle"}
            size={50}
            color={success ? "green" : "red"}
          />
        </Animatable.View>
      )}
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
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  iconContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
