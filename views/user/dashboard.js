import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { LogoutButton } from "../../components/logout";
import { CONSTANTS } from "../../constants/constants";
import { UpdateButton } from "../../components/update";

export const DashboardScreen = ({
  setIsAuth,
  setToken,
  token,
  userIdentifier,
  setUserIdentifier,
  onLayoutRootView,
}) => {
  const [user, setUser] = useState("");
  const [timeSinceLastCigarette, setTimeSinceLastCigarette] = useState("");
  const [unsmokedCigarettes, setUnsmokedCigarettes] = useState("");
  const [economies, setEconomies] = useState("");
  const [timePreserved, setTimePreserved] = useState("");
  const [waterEconomies, setWaterEconomies] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(
        `https://ouiquit-api.herokuapp.com/api/users?email=${userIdentifier}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setUser(data["hydra:member"][0]);
    } catch (e) {
      console.error(e);
    }
  };

  const getTimeSinceLastCigarette = () => {
    const userLastTime = new Date(user.lastTime);
    const now = new Date();

    const days = parseInt((now - userLastTime) / (1000 * 60 * 60 * 24));

    const hours = parseInt(
      (Math.abs(now - userLastTime) / (1000 * 60 * 60)) % 24
    );
    const minutes = parseInt(
      (Math.abs(now.getTime() - userLastTime.getTime()) / (1000 * 60)) % 60
    );

    setTimeSinceLastCigarette(
      `${days} jours ${hours} heures ${minutes} minutes`
    );
  };

  const getUnsmokedCigarettes = () => {
    const dailyConsumption = user.dailyConsumption;
    const userLastTime = new Date(user.lastTime);
    const now = new Date();

    const timeSinceCreationDate = parseInt(
      (Math.abs(now - userLastTime) / (1000 * 60 * 60)) % 24
    );
    const hourlyConsumption = dailyConsumption / 24;

    const unsmoked = parseInt(timeSinceCreationDate * hourlyConsumption);
    setUnsmokedCigarettes(unsmoked);
  };

  const getEconomies = () => {
    const packPrice = user.packPrice;
    const cigarettesPerPack = user.cigarettesPerPack;
    const economies = (unsmokedCigarettes / cigarettesPerPack) * packPrice;

    setEconomies(parseInt(economies));
  };

  const getTimeOfLifePreserved = () => {
    const daysPreserved =
      (CONSTANTS.minuteOfLivePerCig * unsmokedCigarettes) / 60 / 24;
    const hoursPreserved =
      ((CONSTANTS.minuteOfLivePerCig * unsmokedCigarettes) / 60) % 24;
    const minutesPreserved =
      (CONSTANTS.minuteOfLivePerCig * unsmokedCigarettes) % 60;

    setTimePreserved(
      `${parseInt(daysPreserved)} jours, ${parseInt(
        hoursPreserved
      )} heures et ${parseInt(minutesPreserved)} minutes`
    );
  };

  const getWaterEconomies = () => {
    setWaterEconomies(
      parseInt(CONSTANTS.litreOfWaterPerCig * unsmokedCigarettes)
    );
  };

  const updateDatas = async () => {
    try {
      const response = await fetch(
        `https://ouiquit-api.herokuapp.com/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            unsmokedCigarettes: unsmokedCigarettes,
            economies: economies,
            waterEconomies: waterEconomies,
          }),
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (userIdentifier) {
      getUser();
    }
  }, [userIdentifier]);

  useEffect(() => {
    if (user) {
      getTimeSinceLastCigarette();
      getUnsmokedCigarettes();
    }
  }, [user]);

  useEffect(() => {
    if (unsmokedCigarettes !== undefined) {
      getEconomies();
      getTimeOfLifePreserved();
      getWaterEconomies();
      updateDatas();
    }
  }, [unsmokedCigarettes]);

  if (!user) {
    return <Text>Loading</Text>;
  }

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
      <>
        <Text>
          Bienvenue {user.firstName} {user.lastName}
        </Text>

        <Text>Vous n'avez pas fumé depuis {timeSinceLastCigarette}</Text>
        <Text>
          {user.unsmokedCigarettes} cigarettes non fumées vous faisant
          économiser {user.economies} €
        </Text>
        <Text> Temps de vie préservé : {timePreserved}</Text>
        <Text>Litre d'eau économisés : {user.waterEconomies} Litres</Text>
      </>

      <UpdateButton
        id={user.id}
        token={token}
        unsmokedCigarettes={unsmokedCigarettes - 1}
        setUserIdentifier={setUserIdentifier}
        userIdentifier={userIdentifier}
      ></UpdateButton>

      <LogoutButton
        setIsAuth={setIsAuth}
        setToken={setToken}
        setUserIdentifier={setUserIdentifier}
        onLayoutRootView={onLayoutRootView}
      ></LogoutButton>
    </View>
  );
};
