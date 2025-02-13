/** @format */

import SearchInput from "@/components/global/search-input";
import AddCustomer from "./add.customer";

const HeaderCustomerPage = () => {
  return (
    <>
      <div className="flex justify-end items-center space-x-4 ">
        <SearchInput path="customers" />
        <div className="w-1/4 flex space-x-2">
          <AddCustomer />
        </div>
      </div>
    </>
  );
};

export default HeaderCustomerPage;
