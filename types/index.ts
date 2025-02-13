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
enum PaymentMethod {
  Cash,
  Check,
  BankTransfer,
  MobileBank,
}
export type TCart = {
  product: {
    name: string;
    weight: number;
    unit: "Kg" | "Bag";
    category: { name: string };
  };
  godown: {
    name: string;
    address: string;
  };
  quantity: number;
  price: number;
  totalPrice: number;
};
export type TOrder = {
  id: number;
  customer: { name: string; address: string };
  orderedBy: { name: string; address: string };
  total: number;
  paid: number;
  discount: number;
  due: number;
  paymentMethod: PaymentMethod;
  updatedAt: string;
  cart: TCart[];
};

export type TProduct = {
  id: number;
  name: string;
  weight: number;
  price: number;
  unit: "Kg" | "Bag";
};

export type TGodown = {
  id: number;
  name: string;
  quantity: number;
};
export type TStocks = {
  category: string;
  product: string;
  godowns: TGodown[];
  totalQuantity: number;
};
export type TCartItem = {
  id: number;
  name: string;
  weight: number;
  unit: "Kg" | "Bag";
  price: number;
  quantity: number;
  totalPrice: number;
  godownId: number;
};
export type TPayload = {
  item?: TCartItem;
  itemId?: number;
  newQuantity?: number;
  newPrice?: number;
};

export type TManager = {
  id: number;
  name: string;
  address: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
