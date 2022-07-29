import React from "react";
import { View, Button } from "react-native";

export const LogoutButton = ({
  setIsAuth,
  setToken,
  setUserIdentifier,
  onLayoutRootView,
}) => {
  const logout = async () => {
    setIsAuth(false);
    setToken("");
    setUserIdentifier("");
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
      <Button
        onPress={logout}
        title="Déconnexion"
        color="#841584"
        accessibilityLabel="Déconnexion"
      />
    </View>
  );
};
