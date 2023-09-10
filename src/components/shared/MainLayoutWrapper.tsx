"use client";

import { useAppState } from "@/context";
import React from "react";
import TopBar from "./TobBar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLeftSideOpen } = useAppState();
  return (
    <div
      className={`w-full   ease-in-out duration-300    ${
        isLeftSideOpen ? " pl-64" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default LayoutWrapper;
