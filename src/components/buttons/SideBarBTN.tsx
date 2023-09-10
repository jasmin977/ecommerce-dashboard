"use client";
import { useAppState } from "@/context";
import React from "react";
import { Button } from "../ui/button";
import { Menu, Outdent } from "lucide-react";

function SideBarBTN() {
  const { isLeftSideOpen, setIsLeftSideOpen } = useAppState();
  const toggleSidebar = () => {
    setIsLeftSideOpen(!isLeftSideOpen);
  };
  return (
    <Button onClick={toggleSidebar} size={"icon"}>
      {isLeftSideOpen ? <Outdent /> : <Menu />}
    </Button>
  );
}

export default SideBarBTN;
