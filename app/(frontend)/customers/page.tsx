/** @format */
export const dynamic = "force-dynamic";
import HeaderCustomerPage from "./components/header.customer";
import { getCustomers } from "@/app/(frontend)/query/customer.query";
import { columns } from "./columns";
import { DataTable } from "../../../components/global/data-table";
const CustomerPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; q?: string };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit, 10) : 20;
  const q = searchParams.q || "";
  const { data, pagination, loading, error } = await getCustomers({
    limit,
    page,
    q,
  });
  if (loading) return <h2>Loading customers....</h2>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="px-36">
      <HeaderCustomerPage />
      <div className="mt-4" />
      <DataTable
        key={`${crypto.randomUUID()}-${page}-${q}-${data.length}`}
        columns={columns}
        data={data}
        rowCount={pagination.total}
        page={page}
        limit={limit}
        path="customers"
        usePaginataion={true}
      />
    </div>
  );
};

export default CustomerPage;
