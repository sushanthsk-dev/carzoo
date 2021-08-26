import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IPADDRESS } from "../../utils/env";
export const AgentMechanicContext = createContext();

export const AgentMechanicContextProvider = ({ children }) => {
  const { headerToken } = useContext(AuthenticationContext);
  const [agentMechanic, setAgentMechanic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAgentMechanic = async (role) => {
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
  const activateAgentMechanic = async (userId, role) => {
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
      }}
    >
      {children}
    </AgentMechanicContext.Provider>
  );
};
