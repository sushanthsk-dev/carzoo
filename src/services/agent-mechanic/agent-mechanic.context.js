import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IPADDRESS } from "../../utils/env";
import { toastMessage } from "../../components/toast-message/toast.component";
export const AgentMechanicContext = createContext();

export const AgentMechanicContextProvider = ({ children }) => {
  const { headerToken } = useContext(AuthenticationContext);
  const [agentMechanic, setAgentMechanic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAgentMechanic = async (role) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${IPADDRESS}/api/v1/admin?role=${role}&fields=-passwordResetExpires,-passwordResetToken&sort=name`,
        headers: { Authorization: `Bearer ${headerToken}` },
      });
      setAgentMechanic(res.data.data.doc);

      setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };
  const createAgentMechanic = async (data, role) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: `${IPADDRESS}/api/v1/admin`,
        headers: { Authorization: `Bearer ${headerToken}` },
        data: data,
      });
      if (res.data.status === "success") {
        await getAgentMechanic(role);
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

  const deactivateAgentMechanic = async (userId, role) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "DELETE",
        url: `${IPADDRESS}/api/v1/admin/deleteAgentMechanic`,
        headers: { Authorization: `Bearer ${headerToken}` },
        data: {
          userId: userId,
        },
      });
      toastMessage(`${role} deactivated `);
      if (res.data.status === "success") {
        getAgentMechanic(role);
        setIsLoading(false);
        console.log(res.data.status);

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
  const activateAgentMechanic = async (userId, role) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PATCH",
        url: `${IPADDRESS}/api/v1/admin/activateAgentMechanic`,
        headers: { Authorization: `Bearer ${headerToken}` },
        data: {
          userId: userId,
        },
      });

      if (res.data.status === "success") {
        getAgentMechanic(role);
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
  // useEffect(() => {
  //   getAgentMechanic();
  // }, []);

  // Mechanic add current location
  // const addMechanicLocation = async (coordinate) => {
  //   setIsLoading(true);

  //   try {
  //     const res = await axios({
  //       method: "PATCH",
  //       url: `${IPADDRESS}/api/v1/admin/current-location`,
  //       headers: { Authorization: `Bearer ${headerToken}` },
  //       data: {
  //         location: coordinates : [coordinate.lat,],
  //       },
  //     });
  //     if (res.data.status === "success") {
  //       setUpdate(true);
  //       setServiceOrder(res.data.data.data);
  //       filteredServiceOrderedList(orderId, orderStatus);
  //       setIsLoading(false);
  //       toastMessage(`location added successfully`);
  //       return "success";
  //     }
  //     setIsLoading(false);
  //     // setAgentMechanic(res.data.data.doc);
  //   } catch (e) {
  //     console.log("E", e.response.data);
  //     setError(e.response.data.message);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <AgentMechanicContext.Provider
      value={{
        agentMechanic,
        setAgentMechanic,
        getAgentMechanic,
        createAgentMechanic,
        deactivateAgentMechanic,
        activateAgentMechanic,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </AgentMechanicContext.Provider>
  );
};
