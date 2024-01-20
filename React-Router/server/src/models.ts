import type {
  User as PrismaUser,
  Product as PrismaProduct,
  ProductImage as PrismaProductImage,
  Role as PrismaRole,
  OrderItem as PrismaOrderItem,
  Order as PrismaOrder,
  CartItem as PrismaCartItem,
} from "@prisma/client";

export type UserModel = PrismaUser;
export type ProductModel = PrismaProduct;
export type ProductImageModel = PrismaProductImage;
export type RoleModel = PrismaRole;
export type OrderItemModel = PrismaOrderItem;
export type OrderModel = PrismaOrder;
export type CartItemModel = PrismaCartItem;

// Need to see if I can reference types like this in my codegen file or if I need to type out each type
