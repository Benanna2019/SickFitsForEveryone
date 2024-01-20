/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation ADD_TO_CART_MUTATION($id: ID!) {\n    addToCart(productId: $id) {\n      id\n    }\n  }\n": types.Add_To_Cart_MutationDocument,
    "\n  mutation CREATE_ORDER_MUTATION($token: String!) {\n    checkout(token: $token) {\n      id\n      charge\n      total\n      items {\n        id\n        name\n      }\n    }\n  }\n": types.Create_Order_MutationDocument,
    "\n  mutation CREATE_PRODUCT_MUTATION(\n    $name: String!\n    $description: String!\n    $price: Int!\n    $image: String!\n  ) {\n    createProduct(\n      name: $name\n      description: $description\n      price: $price\n      status: \"AVAILABLE\"\n      image: $image\n    ) {\n      id\n      price\n      description\n      name\n    }\n  }\n": types.Create_Product_MutationDocument,
    "\n  query ProductsCountQuery {\n    productsCount\n  }\n": types.ProductsCountQueryDocument,
    "\nquery ProductsForHome($take: Int, $skip: Int!) {\n    productsForHome(take: $take, skip: $skip) {\n      id\n      name\n      description\n      status\n      price\n      photo {\n        id\n        image\n        altText\n      }\n    }\n  }\n": types.ProductsForHomeDocument,
    "\n  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {\n    deleteCartItem(id: $id) {\n      id\n    }\n  }\n": types.Remove_From_Cart_MutationDocument,
    "\n  query SingleProductQuery($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      status\n      price\n      photo {\n        id\n        image\n        altText\n      }\n    }\n  }\n": types.SingleProductQueryDocument,
    "\n  query Query {\n    user {\n      id\n      email\n      superTokenUserId\n      name\n      cart {\n        id\n        quantity\n        product {\n          id\n          price\n          name\n          description\n          photo {\n            id\n            image\n            altText\n          }\n        }\n      }\n    }\n  }\n": types.QueryDocument,
    "\n  query SINGLE_ORDER_QUERY($id: ID!) {\n    order(id: $id) {\n      id\n      charge\n      total\n      user {\n        superTokenUserId\n      }\n      items {\n        id\n        name\n        description\n        price\n        quantity\n        photo {\n          id\n          image \n          altText\n        }\n      }\n    }\n  }\n": types.Single_Order_QueryDocument,
    "\n  query USER_ORDERS_QUERY {\n    allOrders {\n      id\n      charge\n      total\n      user {\n        superTokenUserId\n      }\n      items {\n        id\n        name\n        description\n        price\n        quantity\n        photo {\n          id\n          image\n          altText\n        }\n      }\n    }\n  }\n": types.User_Orders_QueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ADD_TO_CART_MUTATION($id: ID!) {\n    addToCart(productId: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation ADD_TO_CART_MUTATION($id: ID!) {\n    addToCart(productId: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CREATE_ORDER_MUTATION($token: String!) {\n    checkout(token: $token) {\n      id\n      charge\n      total\n      items {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CREATE_ORDER_MUTATION($token: String!) {\n    checkout(token: $token) {\n      id\n      charge\n      total\n      items {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CREATE_PRODUCT_MUTATION(\n    $name: String!\n    $description: String!\n    $price: Int!\n    $image: String!\n  ) {\n    createProduct(\n      name: $name\n      description: $description\n      price: $price\n      status: \"AVAILABLE\"\n      image: $image\n    ) {\n      id\n      price\n      description\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CREATE_PRODUCT_MUTATION(\n    $name: String!\n    $description: String!\n    $price: Int!\n    $image: String!\n  ) {\n    createProduct(\n      name: $name\n      description: $description\n      price: $price\n      status: \"AVAILABLE\"\n      image: $image\n    ) {\n      id\n      price\n      description\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProductsCountQuery {\n    productsCount\n  }\n"): (typeof documents)["\n  query ProductsCountQuery {\n    productsCount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ProductsForHome($take: Int, $skip: Int!) {\n    productsForHome(take: $take, skip: $skip) {\n      id\n      name\n      description\n      status\n      price\n      photo {\n        id\n        image\n        altText\n      }\n    }\n  }\n"): (typeof documents)["\nquery ProductsForHome($take: Int, $skip: Int!) {\n    productsForHome(take: $take, skip: $skip) {\n      id\n      name\n      description\n      status\n      price\n      photo {\n        id\n        image\n        altText\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {\n    deleteCartItem(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {\n    deleteCartItem(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SingleProductQuery($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      status\n      price\n      photo {\n        id\n        image\n        altText\n      }\n    }\n  }\n"): (typeof documents)["\n  query SingleProductQuery($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      description\n      status\n      price\n      photo {\n        id\n        image\n        altText\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query {\n    user {\n      id\n      email\n      superTokenUserId\n      name\n      cart {\n        id\n        quantity\n        product {\n          id\n          price\n          name\n          description\n          photo {\n            id\n            image\n            altText\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    user {\n      id\n      email\n      superTokenUserId\n      name\n      cart {\n        id\n        quantity\n        product {\n          id\n          price\n          name\n          description\n          photo {\n            id\n            image\n            altText\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SINGLE_ORDER_QUERY($id: ID!) {\n    order(id: $id) {\n      id\n      charge\n      total\n      user {\n        superTokenUserId\n      }\n      items {\n        id\n        name\n        description\n        price\n        quantity\n        photo {\n          id\n          image \n          altText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SINGLE_ORDER_QUERY($id: ID!) {\n    order(id: $id) {\n      id\n      charge\n      total\n      user {\n        superTokenUserId\n      }\n      items {\n        id\n        name\n        description\n        price\n        quantity\n        photo {\n          id\n          image \n          altText\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query USER_ORDERS_QUERY {\n    allOrders {\n      id\n      charge\n      total\n      user {\n        superTokenUserId\n      }\n      items {\n        id\n        name\n        description\n        price\n        quantity\n        photo {\n          id\n          image\n          altText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query USER_ORDERS_QUERY {\n    allOrders {\n      id\n      charge\n      total\n      user {\n        superTokenUserId\n      }\n      items {\n        id\n        name\n        description\n        price\n        quantity\n        photo {\n          id\n          image\n          altText\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;