import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import styles from "./style";

const AuthScreen = ({ navigation }) => {
  const [failCounter, setFailCounter] = useState(0);
  const onAuth = async () => {
    await LocalAuthentication.hasHardwareAsync();

    const tmp = await LocalAuthentication.authenticateAsync();

    console.log(tmp);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onAuth}>
        <Text>Click to auth</Text>
      </Pressable>
    </View>
  );
};

export default AuthScreen;
