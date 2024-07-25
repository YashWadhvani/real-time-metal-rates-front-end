import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import { METALS_API_KEY } from "@env";

export default function HomeScreen({ navigation }) {
  const [metalRates, setMetalRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const { user } = useContext(AuthContext);

  console.log("User Details:", user);

  const fetchExchangeRate = async () => {
    const url =
      "https://api.metals.dev/v1/currencies?api_key=BZ92BLGQUBCEPE0IET6F6440IET6F&base=INR";

    try {
      const response = await fetch(url);
      const result = await response.json();
      return result.currencies.USD;
    } catch (err) {
      throw new Error("Failed to fetch exchange rate");
    }
  };

  const fetchMetalRates = async () => {
    const url = `https://api.metals.dev/v1/latest?api_key=${METALS_API_KEY}&unit=toz&metal=gold,silver&currency=USD`;

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();
      return result.metals;
    } catch (err) {
      throw new Error("Failed to fetch metal rates");
    }
  };

  const updateRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const [metalRatesData, exchangeRateData] = await Promise.all([
        fetchMetalRates(),
        fetchExchangeRate(),
      ]);

      setMetalRates(metalRatesData);
      setExchangeRate(exchangeRateData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateRates();
    const intervalId = setInterval(updateRates, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const convertToINR = (usdRate, conversionFactor) => {
    return usdRate * conversionFactor * exchangeRate;
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate("Dashboard")}>
        Show Dashboard
      </Button>

      <Text style={styles.header}>Live Metal Rates Today!</Text>
      {loading && <ActivityIndicator animating={true} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {metalRates && exchangeRate && (
        <View style={styles.ratesContainer}>
          <Text style={styles.rateText}>
            Gold (10g): ₹
            {convertToINR(metalRates.gold, 10 / 31.1035).toFixed(2)}
          </Text>
          <Text style={styles.rateText}>
            Silver (1kg): ₹
            {convertToINR(metalRates.silver, 1000 / 31.1035).toFixed(2)}
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginVertical: 20,
  },
  ratesContainer: {
    marginTop: 20,
  },
  rateText: {
    fontSize: 18,
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
