import { GraphQLResolveInfo } from 'graphql';
import { ProductModel, UserModel, ProductImageModel, RoleModel, OrderItemModel, OrderModel, CartItemModel } from './models';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID']['output'];
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
};

export type CartItemOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type CartItemWhereInput = {
  AND?: InputMaybe<Array<CartItemWhereInput>>;
  NOT?: InputMaybe<Array<CartItemWhereInput>>;
  OR?: InputMaybe<Array<CartItemWhereInput>>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  user?: InputMaybe<UserWhereInput>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart?: Maybe<CartItem>;
  checkout?: Maybe<Order>;
  /** Create a new product */
  createProduct: Product;
  createUser: User;
  deleteCartItem?: Maybe<CartItem>;
};


export type MutationAddToCartArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCheckoutArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};


export type MutationDeleteCartItemArgs = {
  id: Scalars['ID']['input'];
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Order = {
  __typename?: 'Order';
  charge: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items?: Maybe<Array<OrderItem>>;
  itemsCount?: Maybe<Scalars['Int']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
  user: User;
};


export type OrderItemsArgs = {
  orderBy?: Array<OrderItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderItemWhereInput;
};


export type OrderItemsCountArgs = {
  where?: OrderItemWhereInput;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderItem = {
  __typename?: 'OrderItem';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order?: Maybe<Order>;
  photo: ProductImage;
  price: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
};

export type OrderItemOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type OrderItemWhereInput = {
  AND?: InputMaybe<Array<OrderItemWhereInput>>;
  NOT?: InputMaybe<Array<OrderItemWhereInput>>;
  OR?: InputMaybe<Array<OrderItemWhereInput>>;
  id?: InputMaybe<IdFilter>;
};

export type OrderOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  id?: InputMaybe<IdFilter>;
};

/** A track is a group of Modules that teaches about a specific topic */
export type Product = {
  __typename?: 'Product';
  /** The product description */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The product name */
  name: Scalars['String']['output'];
  /** The product photo info */
  photo: ProductImage;
  /** Product price */
  price: Scalars['Int']['output'];
  /** Product Status */
  status?: Maybe<Scalars['String']['output']>;
  /** Associated user */
  user?: Maybe<User>;
};

/** A Product Image */
export type ProductImage = {
  __typename?: 'ProductImage';
  /** The product image alt text */
  altText: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The product image */
  image: Scalars['String']['output'];
};

export type ProductOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  id?: InputMaybe<IdFilter>;
};

export type Query = {
  __typename?: 'Query';
  allOrders: Array<Order>;
  order: Order;
  /** Fetch a specific track, provided a track's ID */
  product: Product;
  /** Fetch a specific module, provided a module's ID */
  productImage: ProductImage;
  /** All Products count */
  productsCount: Scalars['Int']['output'];
  /** Query to get tracks array for the homepage grid */
  productsForHome: Array<Product>;
  /** Fetch a specific user, provided a user's ID */
  user: User;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductImageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsForHomeArgs = {
  skip: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Our User Object Type */
export type User = {
  __typename?: 'User';
  /** User Avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  cart?: Maybe<Array<CartItem>>;
  cartCount?: Maybe<Scalars['Int']['output']>;
  /** The user's email address */
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  /** The given name of the user */
  name?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']['output']>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']['output']>;
  /** User is Viewer */
  role?: Maybe<UserRole>;
  /** Users supertoken id */
  superTokenUserId: Scalars['String']['output'];
};


/** Our User Object Type */
export type UserCartArgs = {
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CartItemWhereInput;
};


/** Our User Object Type */
export type UserCartCountArgs = {
  where?: CartItemWhereInput;
};


/** Our User Object Type */
export type UserOrdersArgs = {
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderWhereInput;
};


/** Our User Object Type */
export type UserOrdersCountArgs = {
  where?: OrderWhereInput;
};


/** Our User Object Type */
export type UserProductsArgs = {
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


/** Our User Object Type */
export type UserProductsCountArgs = {
  where?: ProductWhereInput;
};

export enum UserRole {
  Admin = 'ADMIN',
  Blocked = 'BLOCKED',
  User = 'USER'
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  email?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IdFilter>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CartItem: ResolverTypeWrapper<CartItemModel>;
  CartItemOrderByInput: CartItemOrderByInput;
  CartItemWhereInput: CartItemWhereInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IDFilter: IdFilter;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NestedStringNullableFilter: NestedStringNullableFilter;
  Order: ResolverTypeWrapper<OrderModel>;
  OrderDirection: OrderDirection;
  OrderItem: ResolverTypeWrapper<OrderItemModel>;
  OrderItemOrderByInput: OrderItemOrderByInput;
  OrderItemWhereInput: OrderItemWhereInput;
  OrderOrderByInput: OrderOrderByInput;
  OrderWhereInput: OrderWhereInput;
  Product: ResolverTypeWrapper<ProductModel>;
  ProductImage: ResolverTypeWrapper<ProductImageModel>;
  ProductOrderByInput: ProductOrderByInput;
  ProductWhereInput: ProductWhereInput;
  Query: ResolverTypeWrapper<{}>;
  QueryMode: QueryMode;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringNullableFilter: StringNullableFilter;
  User: ResolverTypeWrapper<UserModel>;
  UserRole: UserRole;
  UserWhereInput: UserWhereInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CartItem: CartItemModel;
  CartItemOrderByInput: CartItemOrderByInput;
  CartItemWhereInput: CartItemWhereInput;
  ID: Scalars['ID']['output'];
  IDFilter: IdFilter;
  Int: Scalars['Int']['output'];
  Mutation: {};
  NestedStringNullableFilter: NestedStringNullableFilter;
  Order: OrderModel;
  OrderItem: OrderItemModel;
  OrderItemOrderByInput: OrderItemOrderByInput;
  OrderItemWhereInput: OrderItemWhereInput;
  OrderOrderByInput: OrderOrderByInput;
  OrderWhereInput: OrderWhereInput;
  Product: ProductModel;
  ProductImage: ProductImageModel;
  ProductOrderByInput: ProductOrderByInput;
  ProductWhereInput: ProductWhereInput;
  Query: {};
  String: Scalars['String']['output'];
  StringNullableFilter: StringNullableFilter;
  User: UserModel;
  UserWhereInput: UserWhereInput;
};

export type CartItemResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addToCart?: Resolver<Maybe<ResolversTypes['CartItem']>, ParentType, ContextType, Partial<MutationAddToCartArgs>>;
  checkout?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCheckoutArgs, 'token'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'description' | 'image' | 'name' | 'price' | 'status'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deleteCartItem?: Resolver<Maybe<ResolversTypes['CartItem']>, ParentType, ContextType, RequireFields<MutationDeleteCartItemArgs, 'id'>>;
};

export type OrderResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  charge?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['OrderItem']>>, ParentType, ContextType, RequireFields<OrderItemsArgs, 'orderBy' | 'skip' | 'where'>>;
  itemsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<OrderItemsCountArgs, 'where'>>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  photo?: Resolver<ResolversTypes['ProductImage'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photo?: Resolver<ResolversTypes['ProductImage'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductImageResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ProductImage'] = ResolversParentTypes['ProductImage']> = {
  altText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allOrders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<QueryOrderArgs, 'id'>>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  productImage?: Resolver<ResolversTypes['ProductImage'], ParentType, ContextType, RequireFields<QueryProductImageArgs, 'id'>>;
  productsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productsForHome?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsForHomeArgs, 'skip'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cart?: Resolver<Maybe<Array<ResolversTypes['CartItem']>>, ParentType, ContextType, RequireFields<UserCartArgs, 'orderBy' | 'skip' | 'where'>>;
  cartCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<UserCartCountArgs, 'where'>>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType, RequireFields<UserOrdersArgs, 'orderBy' | 'skip' | 'where'>>;
  ordersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<UserOrdersCountArgs, 'where'>>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType, RequireFields<UserProductsArgs, 'orderBy' | 'skip' | 'where'>>;
  productsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<UserProductsCountArgs, 'where'>>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  superTokenUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  CartItem?: CartItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductImage?: ProductImageResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

