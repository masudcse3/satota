/** @format */
"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCustomers } from "../../query/customer.query";
import { TCustomer, TCustomerType } from "@/types";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { customerValidator } from "../../validator/customer.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputText from "@/components/global/InputText";
import InputSelect from "@/components/global/InputSelect";
import { useCart } from "../../contexts/cart.context";
import { DataTable } from "@/components/global/data-table";
import { useCartColumns } from "../new/cartColumn";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { saleValidator } from "../../validator/sale.validator";
import { useSession } from "next-auth/react";
const Cart = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  // manage the customer
  const initialState = {
    name: "",
    phone: "",
    address: "",
    type: "Wholesale", // Default customer type
  } as Partial<TCustomer>;
  const [customers, setCustomers] = useState<TCustomer[]>([]);
  const [customer, setCustomer] = useState<Partial<TCustomer>>(initialState);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false); // New state to track selection
  const customerName = customer.name!;
  const cartColumns = useCartColumns();

  useEffect(() => {
    // Skip fetching if a customer is already selected
    if (isCustomerSelected) {
      return;
    }

    const getCustomerByName = async () => {
      if (customerName.length > 1) {
        const { data } = await getCustomers({
          q: customerName,
          page: 1,
          limit: 50,
        });
        setCustomers(data);
      } else {
        setCustomers([]); // Clear customers if search term is too short
      }
    };

    getCustomerByName();

    // Cleanup function to reset customers array
    return () => {
      setCustomers([]);
    };
  }, [customerName, isCustomerSelected]); // Add isCustomerSelected as a dependency

  const addCustomer = ({ id, name, address, phone, type, due }: TCustomer) => {
    setCustomer({ id, name, address, phone, type, due });
    setCustomers([]); // Clear customers array immediately after selection
    setIsCustomerSelected(true); // Mark customer as selected
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsCustomerSelected(false); // Reset selection state when typing
  };

  const handleTypeChange = (value: TCustomerType) => {
    setCustomer((prev) => ({ ...prev, type: value })); // Update customer type
  };
  const customerForm = useForm<z.infer<typeof customerValidator>>({
    resolver: zodResolver(customerValidator),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      type: "Retail",
    },
  });
  // manage the cart
  const { cart } = useCart();

  // manage the sale record
  const [sale, setSale] = useState({
    paid: 0,
    discount: 0,
    paymentMethod: "Cash",
  });
  const saleForm = useForm<z.infer<typeof saleValidator>>({
    resolver: zodResolver(saleValidator),
    defaultValues: {
      paid: 0,
      discount: 0,
      paymentMethod: "Cash",
    },
  });
  const handleSaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSale((prev) => ({
      ...prev,
      [e.target.name]: e.target.valueAsNumber,
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setSale((prev) => ({ ...prev, paymentMethod: value }));
  };
  const cartTotal = cart.reduce(
    (sum: number, item) => (sum += item.totalPrice),
    0
  );
  const due = (cartTotal - sale.paid - sale.discount).toLocaleString("en-US");
  const handleMakeOrderSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cartItems = cart.map((item) => ({
      productId: item.id,
      godownId: item.godownId,
      price: item.price,
      quantity: item.quantity,
    }));
    console.log("[Customer]", customer);
    console.log("[Cart]", cartItems);
    console.log("[Oeder details]", sale);
  };
  return (
    <div className="search border border-1 rounded p-4 w-2/5">
      <Form {...customerForm}>
        <form className="space-y-6">
          <div className="flex flex-row justify-end">
            Previous Due: {customer.due?.toLocaleString("en-US") || 0}
          </div>
          <div className="flex space-x-2">
            <InputText
              value={customer.name!}
              name="name"
              placeholder="Customer Name"
              onChange={handleChange}
              type="text"
            />
            <InputText
              value={customer.address!}
              name="address"
              placeholder="Customer Address"
              onChange={handleChange}
              disabled={!!customer.id}
              type="text"
            />
            <InputText
              value={customer.phone!}
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              disabled={!!customer.id}
              type="text"
            />
            <InputSelect
              value={customer.type!} // Pass the selected customer type
              onChange={handleTypeChange} // Pass the change handler
              options={[
                { value: "Retail", label: "Retail" },
                { value: "Wholesale", label: "Wholesale" },
              ]}
              className="w-[120px]"
              placeholder="Customer Type"
              disabled={!!customer.id}
            />
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setCustomer(initialState);
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
      {customers.length > 0 && (
        <div className="bg-background max-h-[350px] w-[550px] overflow-y-auto scrollbar absolute z-20  border border-1 rounded mt-2">
          {customerName.length > 1 &&
            customers.map((customer) => (
              <li
                key={customer.id}
                className="list-none cursor-pointer p-2 hover:bg-bgactive"
                onClick={() =>
                  addCustomer({
                    id: customer.id,
                    name: customer.name,
                    phone: customer.phone,
                    address: customer.address,
                    type: customer.type, // Pass the customer type from the API
                    due: customer.due,
                  })
                }
              >
                {customer.name} - {customer.address}
              </li>
            ))}
        </div>
      )}
      <div className="cartDetails mt-2">
        {cart.length > 0 && (
          <DataTable
            data={cart}
            columns={cartColumns}
            rowCount={10}
            page={1}
            limit={100}
            path="sales/new"
            usePaginataion={false}
          />
        )}
      </div>
      {cart.length > 0 && (
        <div className="cash mt-4">
          <div className="flex items-center gap-20 py-2">
            <label className="ml-64">Sub Total:</label>
            <span>{cartTotal.toLocaleString("en-US")}</span>
          </div>

          <Form {...saleForm}>
            <form onSubmit={handleMakeOrderSubmit}>
              <div className="flex items-center justify-between pb-2">
                <label className="ml-64">Paid:</label>
                <InputText
                  name="paid"
                  placeholder="Amount Paid"
                  type="number"
                  value={sale.paid.toString()}
                  onChange={handleSaleChange}
                />
              </div>
              <div className="flex items-center justify-between pb-2">
                <label className="ml-64">Discount:</label>
                <InputText
                  name="discount"
                  placeholder="Discount Amount"
                  type="number"
                  value={sale.discount.toString()}
                  onChange={handleSaleChange}
                />
              </div>
              <div className="flex items-center justify-between pb-2">
                <label className="ml-64">Payment Method:</label>
                <InputSelect
                  options={[
                    { value: "Cash", label: "Cash" },
                    { value: "Check", label: "Check" },
                    { value: "BankTransfer", label: "Bank Transfer" },
                    { value: "MobileBank", label: "Mobile Bank" },
                  ]}
                  value={sale.paymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="w-48"
                  placeholder="Payment Method"
                />
              </div>

              <div className="flex items-center gap-28 py-2">
                <label className="ml-64">Due:</label>
                <span>{due}</span>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="flex items-end">
                  Make Order
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Cart;
