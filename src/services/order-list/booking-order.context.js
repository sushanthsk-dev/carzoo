import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IPADDRESS } from "../../utils/env";
export const BookingOrderContext = createContext();

export const BookingOrderContextProvider = ({ children }) => {
  const { headerToken } = useContext(AuthenticationContext);
  const [orderList, setOrderList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBookingOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${IPADDRESS}/api/v1/booking?sort=-createdAt`,
        headers: { Authorization: `Bearer ${headerToken}` },
      });
      setOrderList(res.data.data.doc);
      setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };
  const assignAgent = async (orderId, agentId) => {
    console.log(orderId, agentId);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PATCH",
        url: `${IPADDRESS}/api/v1/booking/${orderId}`,
        headers: { Authorization: `Bearer ${headerToken}` },
        data: {
          agent: agentId,
        },
      });
      if (res.data.status === "success") {
        await getBookingOrders();
        setIsLoading(false);
        return "success";
      }
      setIsLoading(false);
      // setAgentMechanic(res.data.data.doc);
    } catch (e) {
      console.log("E", e.response.data);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <BookingOrderContext.Provider
      value={{
        getBookingOrders,
        orderList,
        assignAgent,
        isLoading,
        error,
      }}
    >
      {children}
    </BookingOrderContext.Provider>
  );
};
