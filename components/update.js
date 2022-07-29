import React from "react";
import { Button } from "react-native";
import { showMessage } from "react-native-flash-message";

export const UpdateButton = ({ id, token, unsmokedCigarettes }) => {
  const update = async () => {
    try {
      const response = await fetch(
        `https://ouiquit-api.herokuapp.com/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lastTime: new Date(),
          }),
        }
      );
      if (response.status === 200) {
        showMessage({
          message: `Mise a jour effectuée`,
          type: "success",
        });
      } else {
        showMessage({
          message: `Erreur`,
          type: "danger",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      onPress={update}
      title="J'ai fumé"
      color="#841584"
      accessibilityLabel="J'ai fumé"
    />
  );
};
