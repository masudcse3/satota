/** @format */

import SearchInput from "@/components/global/search-input";
import React from "react";
import AddNewSale from "./addNewSale";

const SaleHeader = () => {
  return (
    <div className="flex space-x-2">
      <SearchInput path="sale" />
      <AddNewSale />
    </div>
  );
};

export default SaleHeader;
