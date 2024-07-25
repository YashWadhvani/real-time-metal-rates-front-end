import React from "react";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { AuthProvider } from "./contexts/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  const theme = {
    colors: {
      primary: "rgb(0, 99, 154)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(205, 229, 255)",
      onPrimaryContainer: "rgb(0, 29, 50)",
      secondary: "rgb(168, 55, 44)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(255, 218, 213)",
      onSecondaryContainer: "rgb(65, 0, 1)",
      tertiary: "rgb(75, 87, 169)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(223, 224, 255)",
      onTertiaryContainer: "rgb(0, 13, 95)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(252, 252, 255)",
      onBackground: "rgb(26, 28, 30)",
      surface: "rgb(252, 252, 255)",
      onSurface: "rgb(26, 28, 30)",
      surfaceVariant: "rgb(222, 227, 235)",
      onSurfaceVariant: "rgb(66, 71, 78)",
      outline: "rgb(114, 119, 127)",
      outlineVariant: "rgb(194, 199, 207)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(47, 48, 51)",
      inverseOnSurface: "rgb(240, 240, 244)",
      inversePrimary: "rgb(149, 204, 255)",
      elevation: {
        level0: "transparent",
        level1: "rgb(239, 244, 250)",
        level2: "rgb(232, 240, 247)",
        level3: "rgb(224, 235, 244)",
        level4: "rgb(222, 234, 243)",
        level5: "rgb(217, 231, 241)",
      },
      surfaceDisabled: "rgba(26, 28, 30, 0.12)",
      onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
      backdrop: "rgba(44, 49, 55, 0.4)",
    },
  };
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <IconButton
                    // icon={require("../front-end/assets/default-avatar.png")}
                    size={40}
                    onPress={() => navigation.navigate("Dashboard")}
                    iconColor={theme.colors.primary}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <IconButton
                    icon={require("../front-end/assets/home.png")}
                    size={40}
                    onPress={() => navigation.navigate("Home")}
                    iconColor={theme.colors.primary}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
