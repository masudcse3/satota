/** @format */
"use client";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchInput = ({ path }: { path: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const doSearch = useDebounce((terms: string) => {
    const senitise = terms.trim().replace(/\s+/g, " ");
    const params = new URLSearchParams(searchParams);
    if (senitise.length > 0) {
      params.set("q", senitise);
    } else {
      params.delete("q");
    }
    router.push(`/${path}?q=${senitise}`);
  }, 500);
  const handleSearch = (term: string) => {
    doSearch(term);
  };

  return (
    <div className="w-3/4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 bg-muted/50"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("q")?.toString()}
        />
      </div>
    </div>
  );
};

export default SearchInput;
