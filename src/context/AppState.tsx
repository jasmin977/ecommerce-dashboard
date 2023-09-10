"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

type AppStateContextType = {
  isLeftSideOpen: boolean;

  setIsLeftSideOpen: (s: boolean) => void;
};
interface Props {
  children: ReactNode;
}

const AppStateContext = createContext<AppStateContextType>({
  isLeftSideOpen: true,

  setIsLeftSideOpen: () => {},
});

const AppStateProvider = ({ children }: Props) => {
  const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);

  return (
    <AppStateContext.Provider
      value={{
        isLeftSideOpen,
        setIsLeftSideOpen,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;
export const useAppState = () => useContext(AppStateContext);
