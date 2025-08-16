import { useState } from "react";
import type { SideBarItem } from "../types";
import { Box, House } from "lucide-react";

export const useSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  const sideBarItems: SideBarItem[] = [
    {
      title: "Dashboard",
      path: "/",
      icon: House,
    },
    {
      title: "Products",
      path: "/products",
      icon: Box,
    },
  ];

  return { isOpen, sideBarItems, toggleSideBar };
};
