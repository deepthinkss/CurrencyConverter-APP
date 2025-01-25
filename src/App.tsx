import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CurrencyButton from "./componants/button";

// constants
import { currencyByRupee } from "./constants";

type Currency = {
  name: string;
  value: number;
  flag: string;
  symbol: string;
};

function HomeScreen({ route }: any): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  // Default base currency set to Rupee if not passed from DrawerScreen
  const baseCurrency = route.params?.baseCurrency || {
    name: "RUPEE",
    value: 1,
    flag: "🇮🇳",
    symbol: "₹",
  };

  const handleInputChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setInputValue(numericValue);
  };

  const handleReset = () => {
    setInputValue("");
    setResultValue("");
    setTargetCurrency("");
  };

  const buttonPressed = (targetValue: Currency) => {
    Keyboard.dismiss();

    if (!inputValue || isNaN(parseFloat(inputValue))) {
      setInputValue("0");
      return;
    }

    const inputAmount = parseFloat(inputValue);
    const convertedValue =
      (inputAmount / baseCurrency.value) * targetValue.value;
    const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
    setResultValue(result);
    setTargetCurrency(targetValue.name);
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Currency Converter</Text>
        <Text style={styles.baseCurrency}>
          Base Currency: {baseCurrency.flag} {baseCurrency.name}
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.topContainer}>
        <View style={styles.currencyContainer}>
          <Text style={styles.symbol}>{baseCurrency.symbol}</Text>
          <TextInput
            maxLength={14}
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType="numeric"
            placeholder={`Enter Amount in ${baseCurrency.name}`}
            placeholderTextColor="#999"
            style={styles.inputAmountField}
          />
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        {resultValue ? (
          <Text style={styles.resultTxt}>Converted: {resultValue}</Text>
        ) : (
          <Text style={styles.hintTxt}>Select a currency to convert</Text>
        )}
      </View>

      {/* Currency Buttons */}
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={2}
          data={currencyByRupee}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.button,
                targetCurrency === item.name && styles.selected,
              ]}
              onPress={() => buttonPressed(item)}
            >
              <CurrencyButton {...item} />
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

function DrawerScreen({ navigation }: any) {
  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Select Base Currency</Text>
      <FlatList
        data={currencyByRupee}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            style={styles.drawerButton}
            onPress={() => {
              navigation.navigate("Home", { baseCurrency: item });
            }}
          >
            <Text style={styles.drawerButtonText}>
              {item.flag} {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ baseCurrency: currencyByRupee[0] }} // Default to Rupee
        />
        <Drawer.Screen name="Change Currency" component={DrawerScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  appBar: {
    backgroundColor: "#444",
    padding: 16,
    marginTop: 30,
    alignItems: "center",
  },
  appBarTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  baseCurrency: {
    fontSize: 16,
    color: "#bbb",
    marginTop: 4,
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#444",
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  symbol: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 8,
  },
  inputAmountField: {
    height: 50,
    width: "60%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#888",
    backgroundColor: "#fff",
    fontSize: 18,
    color: "#000",
    marginRight: 8,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#ff4444",
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultTxt: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginTop: 12,
  },
  hintTxt: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 12,
  },
  bottomContainer: {
    flex: 1,
    padding: 16,
  },
  button: {
    flex: 1,
    margin: 12,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selected: {
    backgroundColor: "#4da6ff",
  },
  drawerContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#222",
  },
  drawerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  drawerButton: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  drawerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
