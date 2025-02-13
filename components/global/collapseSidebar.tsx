/** @format */

"use client";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSidebarCollapse } from "@/app/(frontend)/providers/collapse-sidebar";
const CollapseSidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarCollapse();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};

export default CollapseSidebar;
