import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    productsForHome(take: Int, skip: Int!): [Product!]!
    "Fetch a specific track, provided a track's ID"
    product(id: ID!): Product!
    "All Products count"
    productsCount: Int!
    "Fetch a specific module, provided a module's ID"
    productImage(id: ID!): ProductImage!
    "Fetch a specific user, provided a user's ID"
    user: User!
    allOrders: [Order!]!
    order(id: ID!): Order!
  }

  type Mutation {
    "Create a new product"
    createProduct(
      name: String!
      description: String!
      price: Int!
      status: String!
      image: String!
    ): Product!
    createUser: User!
    addToCart(productId: ID): CartItem
    checkout(token: String!): Order
    deleteCartItem(id: ID!): CartItem
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Product {
    id: ID!
    "The product name"
    name: String!
    "The product description"
    description: String!
    "The product photo info"
    photo: ProductImage!
    "Product Status"
    status: String
    "Product price"
    price: Int!
    "Associated user"
    user: User
  }

  "A Product Image"
  type ProductImage {
    id: ID!
    "The product image"
    image: String!
    "The product image alt text"
    altText: String!
  }

  enum UserRole {
    BLOCKED
    USER
    ADMIN
  }

  "Our User Object Type"
  type User {
    id: ID
    "The given name of the user"
    name: String
    "The user's email address"
    email: String
    "Users supertoken id"
    superTokenUserId: String!
    "User Avatar"
    avatar: String
    "User is Viewer"
    role: UserRole
    cart(
      where: CartItemWhereInput! = {}
      orderBy: [CartItemOrderByInput!]! = []
      take: Int
      skip: Int! = 0
    ): [CartItem!]
    cartCount(where: CartItemWhereInput! = {}): Int
    orders(
      where: OrderWhereInput! = {}
      orderBy: [OrderOrderByInput!]! = []
      take: Int
      skip: Int! = 0
    ): [Order!]
    ordersCount(where: OrderWhereInput! = {}): Int
    products(
      where: ProductWhereInput! = {}
      orderBy: [ProductOrderByInput!]! = []
      take: Int
      skip: Int! = 0
    ): [Product!]
    productsCount(where: ProductWhereInput! = {}): Int
  }

  type CartItem {
    id: ID!
    quantity: Int
    product: Product
    user: User
  }

  type Order {
    id: ID!
    label: String
    total: Int!
    items(
      where: OrderItemWhereInput! = {}
      orderBy: [OrderItemOrderByInput!]! = []
      take: Int
      skip: Int! = 0
    ): [OrderItem!]
    itemsCount(where: OrderItemWhereInput! = {}): Int
    user: User!
    charge: String!
  }

  type OrderItem {
    id: ID!
    name: String!
    description: String!
    photo: ProductImage!
    price: Int!
    quantity: Int!
    order: Order
  }

  input UserWhereInput {
    AND: [UserWhereInput!]
    OR: [UserWhereInput!]
    NOT: [UserWhereInput!]
    id: IDFilter
    email: StringNullableFilter
  }

  input StringNullableFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    mode: QueryMode
    not: NestedStringNullableFilter
  }

  input ProductWhereInput {
    AND: [ProductWhereInput!]
    OR: [ProductWhereInput!]
    NOT: [ProductWhereInput!]
    id: IDFilter
  }

  input ProductOrderByInput {
    id: OrderDirection
  }

  input CartItemOrderByInput {
    id: OrderDirection
  }

  enum OrderDirection {
    asc
    desc
  }

  input CartItemWhereInput {
    AND: [CartItemWhereInput!]
    OR: [CartItemWhereInput!]
    NOT: [CartItemWhereInput!]
    id: IDFilter
    product: ProductWhereInput
    user: UserWhereInput
  }

  input OrderWhereInput {
    AND: [OrderWhereInput!]
    OR: [OrderWhereInput!]
    NOT: [OrderWhereInput!]
    id: IDFilter
  }

  input OrderOrderByInput {
    id: OrderDirection
  }

  input OrderItemOrderByInput {
    id: OrderDirection
    name: OrderDirection
  }

  input OrderItemWhereInput {
    AND: [OrderItemWhereInput!]
    OR: [OrderItemWhereInput!]
    NOT: [OrderItemWhereInput!]
    id: IDFilter
  }

  input IDFilter {
    equals: ID
    in: [ID!]
    notIn: [ID!]
    lt: ID
    lte: ID
    gt: ID
    gte: ID
    not: IDFilter
  }

  input NestedStringNullableFilter {
    equals: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
    not: NestedStringNullableFilter
  }

  enum QueryMode {
    default
    insensitive
  }
`;
