/** @format */

import { gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import { FilterOptionsWithDate } from "@/types";

export const getAllOrders = async ({
  from = "",
  to = "",
  page = 1,
  limit = 20,
  customerId = null,
}: FilterOptionsWithDate) => {
  const GET_ORDERS = gql`
    query allOrdes($filter: FilterInputWithDate) {
      getOrders(filter: $filter) {
        data {
          customer {
            name
            address
          }
          orderedBy {
            name
          }
          total
          discount
          paid
          due
          paymentMethod
          updatedAt
          cart {
            product {
              name
              weight
              unit
              category {
                name
              }
            }
            godown {
              name
              address
            }
            price
            quantity
            totalPrice
          }
        }
        pagination {
          total
          totalPages
          prev
          next
          page
          limit
        }
      }
    }
  `;
  const { data } = await client.query({
    query: GET_ORDERS,
    variables: {
      filter: {
        from,
        to,
        page,
        limit,
        customerId,
      },
    },
  });
  return {
    data: data.getOrders.data,
    pagination: data.getOrders.pagination,
  };
};
