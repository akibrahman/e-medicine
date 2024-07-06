"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  //! Get User
  const { data: user, refetch: userRefetch } = useQuery({
    queryKey: ["profile", "user", "all"],
    queryFn: async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/user");
        if (data.success) return data.user;
        else return null;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
  });
  const info = { user, loading };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
