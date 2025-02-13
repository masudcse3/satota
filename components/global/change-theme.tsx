/** @format */

"use client";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

import { useTheme } from "next-themes";
const ChangeTheme = () => {
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleTheme}>
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ChangeTheme;
