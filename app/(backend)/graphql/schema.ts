/** @format */
import { gql } from "graphql-tag";
export const typeDefs = gql`
  # Enums
  enum CustomerType {
    Retail
    Wholesale
  }

  input FilterInput {
    page: Int = 1
    limit: Int = 20
    q: String = ""
  }

  input CustomerUpdateInput {
    name: String
    phone: String
    address: String
    type: CustomerType
  }

  # Types
  type Customer {
    id: Int!
    name: String!
    phone: String!
    address: String!
    type: CustomerType!
    due: Float!
    createdAt: String!
    updatedAt: String!
  }
  type CustomerResponse {
    data: [Customer!]!
    pagination: Pagination!
  }
  type Pagination {
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
    prev: Boolean!
    next: Boolean!
  }

  # Queries
  type Query {
    getCustomers(filter: FilterInput): CustomerResponse!
  }

  # Mutations
  type Mutation {
    #Customer management
    createCustomer(
      name: String!
      phone: String!
      address: String!
      type: CustomerType!
    ): Customer!
    updateCustomer(id: Int!, data: CustomerUpdateInput!): Customer!
  }
`;
