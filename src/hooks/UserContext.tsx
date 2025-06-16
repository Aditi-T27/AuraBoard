// src/context/UserContext.tsx
"use client";

import React, { createContext, useContext } from "react";

type UserContextType = {
  email: string;
  username: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: UserContextType;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
