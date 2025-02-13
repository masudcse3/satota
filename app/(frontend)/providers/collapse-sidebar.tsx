/** @format */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the context type
interface CollapseSidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value of `null` for initialization
export const collapseSidebarContext =
  createContext<CollapseSidebarContextType | null>(null);

// Define the provider's props type
interface SidebarCollapseProviderProps {
  children: ReactNode;
}

// Create the provider component
export const SidebarCollapseProvider: React.FC<
  SidebarCollapseProviderProps
> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <collapseSidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </collapseSidebarContext.Provider>
  );
};

export const useSidebarCollapse = () => {
  const context = useContext(collapseSidebarContext);

  // Throw an error if the hook is used outside the provider
  if (!context) {
    throw new Error(
      "useSidebarCollapse must be used within a SidebarCollapseProvider"
    );
  }

  return context;
};
