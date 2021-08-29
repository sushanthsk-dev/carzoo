import React, { createContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const InternetConnectionCheckContext = createContext();

export const InternetConnectionCheckContextProvider = ({ children }) => {
  const [isOffline, setOfflineStatus] = useState(false);

  const checkConnected = () => {
    return NetInfo.fetch().then((state) => {
      setOfflineStatus(state.isConnected);
    });
  };
  useEffect(() => {
    checkConnected();
  }, []);

  return (
    <InternetConnectionCheckContext.Provider
      value={{ isOffline, setOfflineStatus }}
    >
      {children}
    </InternetConnectionCheckContext.Provider>
  );
};
