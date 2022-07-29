import React, { useCallback, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "./views/auth/login";
import { RegisterScreen } from "./views/auth/register";
import { DashboardScreen } from "./views/user/dashboard";
import FlashMessage from "react-native-flash-message";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const [userIdentifier, setUserIdentifier] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const Tab = createBottomTabNavigator();

  if (!appIsReady) {
    return null;
  }

  if (!isAuth) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarIconStyle: { display: "none" },
            tabBarLabelPosition: "beside-icon",
            tabBarLabelStyle: {
              fontWeight: "700",
              fontSize: 15,
            },
          }}
        >
          <Tab.Screen name="Connexion">
            {(props) => (
              <LoginScreen
                {...props}
                setIsAuth={setIsAuth}
                setToken={setToken}
                setUserIdentifier={setUserIdentifier}
                onLayoutRootView={onLayoutRootView}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Création de compte">
            {(props) => (
              <RegisterScreen {...props} onLayoutRootView={onLayoutRootView} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15,
          },
        }}
      >
        <Tab.Screen name="Dashboard">
          {(props) => (
            <DashboardScreen
              {...props}
              setIsAuth={setIsAuth}
              setToken={setToken}
              token={token}
              userIdentifier={userIdentifier}
              setUserIdentifier={setUserIdentifier}
              onLayoutRootView={onLayoutRootView}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
