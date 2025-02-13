/** @format */

export type FilterOptions = {
  page?: number;
  limit?: number;
  q?: string;
};
export type FilterOptionsWithDate = {
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  customerId?: number | null;
};
export type TCustomerType = "Retail" | "Wholesale";
export type TCustomer = {
  id: number;
  name: string;
  address: string;
  phone: string;
  due: number;
  type: TCustomerType;
};
