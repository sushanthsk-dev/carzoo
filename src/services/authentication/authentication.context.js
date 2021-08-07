import React, { useState, createContext } from "react";
import axios from "axios";
import { IPADDRESS } from "../../utils/env";
import { loginRequest } from "./authentication.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const saveLoggedSession = async (value) => {
    const jwt = {
      token: value,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    try {
      const jsonValue = JSON.stringify(jwt);
      await AsyncStorage.setItem("@loggedSession", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getLoggedSession = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@loggedSession");
      const data = JSON.parse(jsonValue);
      if (
        data !== null &&
        data.expires &&
        new Date(data.expires) < new Date()
      ) {
        AsyncStorage.removeItem("@loggedSession");
        return null;
      }

      return data;
    } catch (e) {
      // error reading value
    }
  };
  const removeSession = async () => AsyncStorage.removeItem("@loggedSession");

  const onLogin = async (email, password, isAdmin = false) => {
    setError(null);
    console.log(IPADDRESS);
    setIsLoading(true);
    try {
      const url =
        isAdmin === true
          ? `${IPADDRESS}/api/v1/admin/login`
          : `${IPADDRESS}/api/v1/users/login`;
      const res = await axios({
        method: "POST",
        url: url,
        data: {
          email,
          password,
        },
      });
      console.log(res);
      if (isAdmin === true) {
        if (res.data.data.user.isNewUser === false) {
          setUser(res.data.data.user);
          setIsLoading(false);
          saveLoggedSession(res.data.token);
        } else {
          setResponse({ id: res.data.data.user._id });
        }
      } else {
        setUser(res.data.data.user);
        setIsLoading(false);
        saveLoggedSession(res.data.token);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e.response);
      // setError(e.response.data.message);
    }
    setIsLoading(false);
  };

  const isUserLoggedIn = async () => {
    const value = await getLoggedSession();
    if (value) {
      try {
        const userRes = await axios({
          method: "GET",
          url: `${IPADDRESS}/api/v1/users/isloggedin`,
          headers: { Authorization: `Bearer ${value.token}` },
        });
        const adminRes = await axios({
          method: "GET",
          url: `${IPADDRESS}/api/v1/admin/isloggedin`,
          headers: { Authorization: `Bearer ${value.token}` },
        });
        const res =
          userRes.data.data !== null ? userRes.data.data : adminRes.data.data;
        setUser(res);
        return user;
      } catch (e) {
        console.log(e);
      }
    }
    return null;
  };
  // eslint-disable-next-line prettier/prettier
  const onRegister = async (name, email, password, repeatedPassword) => {
    setError(null);
    if (password !== repeatedPassword) {
      setIsLoading(false);
      setError("Error: Password do not match");
      return null;
    }
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: `${IPADDRESS}/api/v1/users/signup`,
        data: {
          name: name,
          email: email,
          password: password,
          passwordConfirm: repeatedPassword,
        },
      });
      setUser(res.data.data.user);
      setIsLoading(false);
      saveLoggedSession(res.data.token);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setError(e.response.data.message);
    }
  };

  const onPasswordChange = async (
    oldPassword,
    password,
    passwordConfirm,
    id
  ) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PATCH",
        url: `${IPADDRESS}api/v1/admin/changeMyPassword/${id}`,
        data: {
          passwordCurrent: oldPassword,
          password: password,
          passwordConfirm: passwordConfirm,
        },
      });
      setUser(res.data.data.user);
      saveLoggedSession(res.data.token);
      setResponse(null);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.response.data.message);
    }
    setIsLoading(false);
  };
  const onLogout = () => {
    setUser(null);
    removeSession();
  };
  React.useEffect(() => {
    isUserLoggedIn();
    setError(null);
    setResponse(null);
    setIsLoading(false);
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        getLoggedSession,
        onPasswordChange,
        isUserLoggedIn,
        onLogout,
        setError,
        response,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
