import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import PINInput from "../../components/PINInput";
import { getValueFor } from "../../utils";
import styles from "./style";

const AuthScreen = ({ navigation }) => {
  const [pin, setPin] = useState("");
  const [showPinComponent, setShowPinComponent] = useState(false);
  const [failAttempts, setFailAttempts] = useState(0);

  useEffect(() => {
    onAuth();
  }, []);

  const onAuth = async () => {
    try {
      const canAuthenticate = await LocalAuthentication.hasHardwareAsync();

      if (canAuthenticate) {
        const result = await LocalAuthentication.authenticateAsync();

        if (result.success) {
          setShowPinComponent(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onComplete = async (pin) => {
    const pinFromSS = await getValueFor("pin");

    if (pin === pinFromSS) {
      setFailAttempts(0);
      navigation.reset({
        index: 1,
        routes: [{ name: "Home" }],
      });
    } else {
      setFailAttempts(failAttempts + 1);
      setPin("");
    }
  };

  return (
    <View style={styles.container}>
      <Text>{failAttempts}</Text>
      {!showPinComponent && (
        <Pressable onPress={onAuth}>
          <Text>Login</Text>
        </Pressable>
      )}
      {showPinComponent && (
        <PINInput onComplete={onComplete} pin={pin} setPin={setPin} />
      )}
    </View>
  );
};

export default AuthScreen;
