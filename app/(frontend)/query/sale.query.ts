/** @format */

import { gql } from "@apollo/client";

export const GET_PRODUCTS_WITH_CATEGORY_AND_STOCK = gql`
  query allProducts {
    getCategories {
      id
      name
      products {
        id
        name
        weight
        unit
        price
      }
    }

    getStocks {
      category
      product
      godowns {
        id
        name
        quantity
      }
      totalQuantity
    }
  }
`;
