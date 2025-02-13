/** @format */

import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { FilterOptions } from "@/types";
export const GET_CUSTOMERS = gql`
  query ($filter: FilterInput) {
    getCustomers(filter: $filter) {
      data {
        id
        name
        address
        phone
        due
        type
      }
      pagination {
        total
        page
        totalPages
        limit
        prev
        next
      }
    }
  }
`;
export const getCustomers = async ({ page, limit, q }: FilterOptions) => {
  try {
    const { data, loading, error } = await client.query({
      query: GET_CUSTOMERS,
      variables: {
        filter: {
          page,
          limit,
          q,
        },
      },
      fetchPolicy: "no-cache",
    });
    console.log("Data Fetching...");

    return {
      data: data.getCustomers.data,
      pagination: data.getCustomers.pagination,
      loading,
      error,
    };
  } catch (error) {
    console.error("[Fetching Customer]:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
