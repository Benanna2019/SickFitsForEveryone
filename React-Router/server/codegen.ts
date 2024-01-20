import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.ts",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#DataSourceContext",
        mappers: {
          Product: "./models#ProductModel",
          User: "./models#UserModel",
          ProductImage: "./models#ProductImageModel",
          Role: "./models#RoleModel",
          OrderItem: "./models#OrderItemModel",
          Order: "./models#OrderModel",
          CartItem: "./models#CartItemModel",
        },
      },
    },
  },
};

export default config;
