/** @format */

import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { type TCustomerType } from "@/types";
import { GET_CUSTOMERS } from "@/app/(frontend)/query/customer.query";
export const CREATE_CUSTOMER = gql`
  mutation createCustomer(
    $name: String!
    $phone: String!
    $address: String!
    $type: CustomerType!
  ) {
    createCustomer(name: $name, phone: $phone, address: $address, type: $type) {
      id
      name
      address
      phone
      type
      due
    }
  }
`;

export const createANewCustomer = async ({
  name,
  phone,
  address,
  type,
}: {
  name: string;
  phone: string;
  address: string;
  type: TCustomerType;
}): Promise<{ success: boolean; message: string; data?: unknown }> => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CUSTOMER,
      variables: { name, phone, address, type },
      update: (cache, { data }) => {
        if (!data?.createCustomer) return;

        // Update the cache manually by appending the new customer
        cache.updateQuery(
          {
            query: GET_CUSTOMERS,
            variables: {
              filter: { page: 1 },
            },
          },
          (existingData) => {
            return {
              getCustomers: [
                data.createCustomer,
                ...(existingData?.customers ?? []),
              ],
            };
          }
        );
      },
    });

    return {
      success: true,
      message: "Customer created successfully",
      data: data?.createCustomer, // Returning the created customer data
    };
  } catch (error) {
    console.error("Error creating customer:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
