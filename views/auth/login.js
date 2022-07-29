import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { showMessage } from "react-native-flash-message";

export const LoginScreen = ({
  setIsAuth,
  setToken,
  setUserIdentifier,
  onLayoutRootView,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await fetch(
        "https://ouiquit-api.herokuapp.com/api/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.status === 200) {
        const token = await response.json();
        setIsAuth(true);
        setToken(token.token);
        setUserIdentifier(email);
      } else if (response.status === 401) {
        setIsAuth(false);
        showMessage({
          message: `Identifiants invalides`,
          type: "warning",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
      }}
      onLayout={onLayoutRootView}
    >
      <Text>Page de connexion</Text>
      <TextInput
        style={{ height: 40, width: 200, backgroundColor: "#d8d8d8" }}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      ></TextInput>
      <TextInput
        style={{ height: 40, width: 200, backgroundColor: "#d8d8d8" }}
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      ></TextInput>

      <Button
        onPress={login}
        title="Connexion"
        color="#841584"
        accessibilityLabel="Connexion"
      />
    </View>
  );
};
