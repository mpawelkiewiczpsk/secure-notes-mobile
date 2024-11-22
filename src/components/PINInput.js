import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const PINInput = ({ length = 4, onComplete, pin, setPin }) => {
  const handlePress = (digit) => {
    if (pin.length < length) {
      const newPin = pin + digit;
      setPin(newPin);

      if (newPin.length === length) {
        onComplete && onComplete(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pinDisplay}>
        {pin
          .split("")
          .map(() => "•")
          .join("")}
      </Text>
      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
          <Pressable
            key={n}
            style={styles.button}
            onPress={() => handlePress(n.toString())}
          >
            <Text style={styles.buttonText}>{n}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pinDisplay: {
    fontSize: 24,
    marginBottom: 20,
    letterSpacing: 10,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ccc",
    minWidth: 100,
    padding: 15,
  },
  grid: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PINInput;
