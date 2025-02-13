/** @format */

import { getAllOrders } from "@/app/(frontend)/query/orders.query";
import React from "react";
import { DataTable } from "@/components/global/data-table";
import { columns } from "./columns";

import SaleHeader from "./components/sale-header";
const SalesPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; q?: string };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit, 10) : 20;

  const { data, pagination } = await getAllOrders({ page, limit });

  return (
    <>
      <div className="px-36">
        <SaleHeader />
        <div className="mt-4" />
        <DataTable
          key={`${crypto.randomUUID()}`}
          columns={columns}
          data={data}
          rowCount={pagination.total}
          page={page}
          limit={limit}
          path="sales"
          usePaginataion={true}
        />
      </div>
    </>
  );
};

export default SalesPage;
