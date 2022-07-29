import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { showMessage } from "react-native-flash-message";

export const RegisterScreen = ({ navigation, onLayoutRootView }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dailyConsumption, setDailyConsumption] = useState("");
  const [cigarettesPerPack, setCigarettesPerPack] = useState("");
  const [packPrice, setPackPrice] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await fetch(
        "https://ouiquit-api.herokuapp.com/api/users",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            firstName: firstName,
            lastName: lastName,
            dailyConsumption: parseInt(dailyConsumption),
            cigarettesPerPack: parseInt(cigarettesPerPack),
            packPrice: parseFloat(packPrice),
            password: password,
            plainPassword: password,
          }),
        }
      );
      if (response.status === 201) {
        navigation.navigate("Login");
        showMessage({
          message: "Compte créer, veuillez vous connecter",
          type: "success",
        });
      } else {
        showMessage({
          message: "Une erreur empêche la création du compte",
          type: "danger",
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
      <Text>Création de compte</Text>
      <TextInput
        style={{ height: 40, width: 200, backgroundColor: "#d8d8d8" }}
        placeholder="Prénom"
        onChangeText={(firstName) => setFirstName(firstName)}
      ></TextInput>
      <TextInput
        style={{ height: 40, width: 200, backgroundColor: "#d8d8d8" }}
        placeholder="Nom"
        onChangeText={(lastName) => setLastName(lastName)}
      ></TextInput>
      <TextInput
        style={{ height: 40, width: 200, backgroundColor: "#d8d8d8" }}
        placeholder="Consommation quotidienne"
        onChangeText={(dailyConsumption) =>
          setDailyConsumption(dailyConsumption)
        }
      ></TextInput>
      <TextInput
        style={{ height: 40, width: 200, backgroundColor: "#d8d8d8" }}
        placeholder="Cigarettes par paquet"
        onChangeText={(cigarettesPerPack) =>
          setCigarettesPerPack(cigarettesPerPack)
        }
      ></TextInput>
      <TextInput
        style={{ height: 40, width: 200, backgroundColor: "#d8d8d8" }}
        placeholder="Prix du paquet"
        onChangeText={(packPrice) => setPackPrice(packPrice)}
      ></TextInput>
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
        onPress={register}
        title="Créer son compte"
        color="#841584"
        accessibilityLabel="Créer son compte"
      />
    </View>
  );
};
