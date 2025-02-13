/** @format */
import { gql } from "graphql-tag";
export const typeDefs = gql`
  # Enums
  enum Unit {
    Kg
    Bag
  }

  enum CustomerType {
    Retail
    Wholesale
  }

  enum PaymentMethod {
    Cash
    Check
    BankTransfer
    MobileBank
  }

  enum Source {
    Mill
    Supplier
    LC
    Sale
  }
  enum ActionType {
    STOCK_IN
    STOCK_OUT
  }
  #inputs
  input CategoryInput {
    name: String!
  }

  input ProductInput {
    name: String!
    weight: Float!
    unit: Unit!
    price: Float!
    categoryId: Int!
  }
  input GodownInput {
    name: String!
    address: String
  }
  input StockHistoryInput {
    productId: Int!
    godownId: Int!
    source: Source!
    actionType: ActionType!
    quantity: Int!
  }
  input CartInput {
    productId: Int!
    godownId: Int!
    quantity: Int!
    price: Float!
  }
  input PaymentInput {
    customerId: Int!
    paymentMethod: PaymentMethod!
    amount: Float!
  }
  input FilterInput {
    page: Int = 1
    limit: Int = 20
    q: String = ""
  }
  input FilterInputWithDate {
    from: String = ""
    to: String = ""
    page: Int = 1
    limit: Int = 20
    customerId: Int
  }
  input CustomerUpdateInput {
    name: String
    phone: String
    address: String
    type: CustomerType
  }
  # Types

  type Category {
    id: Int!
    name: String!
    products: [Product!]!
    createdAt: String!
    updatedAt: String!
  }

  type Product {
    id: Int!
    name: String!
    weight: Float!
    unit: Unit!
    price: Float!
    category: Category!
    categoryId: Int!
    stock: [Stock!]!
    stockHistory: [StockHistory!]!
    cart: [Cart!]!
    createdAt: String!
    updatedAt: String!
  }
  type Godown {
    id: Int!
    name: String!
    address: String
    stocks: [Stock!]!
    stockHistory: [StockHistory!]!
    cart: [Cart!]!
    createdAt: String!
    updatedAt: String!
  }
  type Manager {
    id: Int!
    name: String!
    phone: String!
    address: String!
    password: String!
    orders: [Order!]!
    createdAt: String!
    updatedAt: String!
  }

  type Customer {
    id: Int!
    name: String!
    phone: String!
    address: String!
    type: CustomerType!
    orders: [Order!]!
    payment: [Payment!]!
    due: Float!
    createdAt: String!
    updatedAt: String!
  }
  type CustomerResponse {
    data: [Customer!]!
    pagination: Pagination!
  }
  type Order {
    cart: [Cart!]!
    customerId: Int!
    managerId: Int!
    total: Float!
    paid: Float!
    discount: Float!
    due: Float!
    paymentMethod: PaymentMethod!
    customer: Customer!
    orderedBy: Manager!
    updatedAt: String!
  }

  type OrderResponse {
    data: [Order!]!
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
  type Cart {
    productId: Int!
    godownId: Int!
    quantity: Int!
    price: Float!
    product: Product
    godown: Godown
    totalPrice: Float
  }

  type Stock {
    id: Int!
    productId: Int!
    godownId: Int!
    quantity: Int!
    product: Product!
    godown: Godown!
    createdAt: String!
    updatedAt: String!
  }
  type Godowns {
    id: Int!
    name: String!
    quantity: Int!
  }
  type StockDetails {
    product: String!
    category: String!
    totalQuantity: Int!
    godowns: [Godowns!]!
  }
  type StockHistory {
    id: Int!
    productId: Int!
    godownId: Int!
    quantity: Int!
    source: Source!
    actionType: ActionType!
    product: Product!
    godown: Godown!
    timestamp: String!
  }

  type Payment {
    id: Int!
    customerId: Int!
    customer: Customer!
    amount: Float!
    paymentMethod: PaymentMethod!
    createdAt: String!
    updatedAt: String!
  }

  # Queries
  type Query {
    getCategories: [Category!]!
    getCategoryById(id: Int!): Category
    getProducts: [Product!]!
    getProductById(id: Int!): Product
    getManagers: [Manager!]!
    getManagerById(id: Int!): Manager
    getCustomers(filter: FilterInput): CustomerResponse!

    getOrders(filter: FilterInputWithDate): OrderResponse!
    getOrderById(id: Int!): Order
    getCarts: [Cart!]!
    getCartById(id: Int!): Cart
    getStocks(categoryName: String, productName: String): [StockDetails!]!
    getStockById(id: Int!): Stock
    getPayments: [Payment!]!
    getPaymentById(id: Int!): Payment
  }

  # Mutations
  type Mutation {
    # category management
    createCategory(name: String!): Category!
    createBulkCategories(categories: [CategoryInput!]!): [Category!]!

    # Godown Management
    createGodown(name: String!, address: String): Godown!
    updateGodown(id: Int!, name: String, address: String): Godown!
    # product management
    createProduct(
      name: String!
      weight: Float!
      unit: Unit!
      price: Float!
      categoryId: Int!
    ): Product!
    createBulkProducts(products: [ProductInput!]!): [Product!]!
    updateProduct(id: Int!, price: Float!): Product!

    # manager management
    createManager(
      name: String!
      phone: String!
      address: String!
      password: String!
    ): Manager!

    #Customer management
    createCustomer(
      name: String!
      phone: String!
      address: String!
      type: CustomerType!
    ): Customer!
    updateCustomer(id: Int!, data: CustomerUpdateInput!): Customer!

    # orders management
    createOrder(
      customerId: Int!
      paid: Float!
      discount: Float
      paymentMethod: PaymentMethod!
      managerId: Int!
      cart: [CartInput!]!
    ): Order!

    # Cart management
    createCart(
      orderId: Int!
      productId: Int!
      godownId: Int!
      quantity: Int!
      price: Float!
    ): Cart!

    # stock management
    createStock(productid: Int!, quantity: Int!, source: Source!): Stock!
    updateStock(
      productId: Int!
      godownId: Int!
      actionType: ActionType!
      quantity: Int!
      source: Source!
    ): Stock!

    # Payment Management
    createPayment(
      customerid: Int!
      amount: Float!
      paymentMethod: PaymentMethod!
    ): Payment!
  }
`;
