/** @format */

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import Link from "next/link";

const AddNewSale = () => {
  return (
    <Link href="/sales/new">
      <Button className="whitespace-nowrap">
        <Plus /> Add New Sale
      </Button>
    </Link>
  );
};

export default AddNewSale;
