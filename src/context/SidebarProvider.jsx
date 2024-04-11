import { SidebarContext } from "./SidebarContext";
import React, { useState } from 'react';

export const SidebarProvider = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    return (
      <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
        {children}
      </SidebarContext.Provider>
    );
  };