/** @format */

import React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import Butterfly from "../icons/butterfly";
import ChangeTheme from "./change-theme";
import CollapseSidebar from "./collapseSidebar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center md:px-32 sm:px-0 gap-4">
        <CollapseSidebar />
        <div className="flex-1 flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <Butterfly size={24} />
            <span className="font-semibold hidden md:inline-block">
              Satota Agro Food
            </span>
          </div>

          <div className="flex-1 flex items-center max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 bg-muted/50"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ChangeTheme />
          <Separator orientation="vertical" className="h-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
