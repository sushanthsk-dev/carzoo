import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IPADDRESS } from "../../utils/env";

export const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const { getLoggedSession } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(null);

  const saveAddress = (addrss) => {
    setAddress(address);
  };

  const loadAddress = async () => {
    const value = await getLoggedSession();
    try {
      const res = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${value.token}` },
        url: `${IPADDRESS}/api/v1/users/me`,
      });
      console.log("LOADING", res.data.data.doc.address);
      setAddress({
        ...res.data.data.doc.address,
        phoneno: res.data.data.doc.phoneno,
      });
      console.log("ADDRESS", address);
    } catch (e) {
      console.log(e);
      setError(e.response.data.message);
    }
  };

  const add = async (addrss) => {
    setIsLoading(true);
    const value = await getLoggedSession();
    try {
      const res = await axios({
        method: "PATCH",
        headers: { Authorization: `Bearer ${value.token}` },
        url: `${IPADDRESS}/api/v1/users/updateMe`,
        data: {
          phoneno: addrss.phoneno,
          address: addrss,
        },
      });
      console.log(res.data.data);
      if (res.data.status === "success") {
        setAddress(res.data.data.address);
      }
      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  const remove = () => {};

  useEffect(() => {
    setIsLoading(true);
    loadAddress();
    setIsLoading(false);
  }, []);

  return (
    <AddressContext.Provider
      value={{
        address,
        addAddress: add,
        error,
        setAddress,
        setError,
        removeAddress: remove,
        isLoading: isLoading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
