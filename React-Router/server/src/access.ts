// Roles and Permissions

import { rule, shield, and, or, chain, deny } from "graphql-shield";
import { withSession } from "./withSession";
import UserRoles from "supertokens-node/recipe/userroles";
import { DataSourceContext } from "./context";

const isAuthenticated = rule({ cache: "contextual" })(
  async (_, __, ctx: DataSourceContext) => {
    const session = await withSession(ctx, async (session) => session);
    return session !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (_, __, ctx: DataSourceContext) => {
    const session = await withSession(ctx, async (session) => session);
    if (!session) {
      return false;
    }
    if (!session.getUserId()) {
      return false;
    }
    const user = await ctx.dataSources.db.user.findUnique({
      where: {
        superTokenUserId: session.getUserId(),
      },
    });
    if (!user) {
      return false;
    }
    return user.role === "USER";
  }
);

// I probably need to change the return of this to somehow check for the unique product being owned by the current user session
// The check at the bottom isn't correct since I need to be checking if the current product that is being 'managed' is owned by the current user session

const canManageProducts = rule({ cache: "contextual" })(
  async (_, { id }, ctx: DataSourceContext) => {
    const session = await withSession(ctx, async (session) => session);
    if (!session) {
      return false;
    }
    if (!session.getUserId()) {
      return false;
    }
    const userRoles = await UserRoles.getRolesForUser(
      "public",
      session.getUserId()
    );

    if (userRoles.roles.includes("canManageProducts")) {
      return true;
    }

    const product = await ctx.dataSources.db.product.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return product.user.superTokenUserId === session.getUserId() ? true : false;
  }
);

// Similar to the above, in the return of this can order rule, I need a way to check if the current user id from the session is attached to the

const canOrder = rule({ cache: "contextual" })(
  async (_, { id }, ctx: DataSourceContext) => {
    const session = await withSession(ctx, async (session) => session);
    if (!session) {
      return false;
    }
    if (!session.getUserId()) {
      return false;
    }
    const userRoles = await UserRoles.getRolesForUser(
      "public",
      session.getUserId()
    );
    if (userRoles.roles.includes("canManageCart")) {
      return true;
    }

    // const cartItem = await ctx.dataSources.db.cartItem.findUnique({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     user: true,
    //   },
    // });

    // return cartItem.user.superTokenUserId === session.getUserId()
    //   ? true
    //   : false;
  }
);

const canManageOrderItems = rule({ cache: "contextual" })(
  async (_, { id }, ctx: DataSourceContext) => {
    const session = await withSession(ctx, async (session) => session);
    if (!session) {
      return false;
    }
    if (!session.getUserId()) {
      return false;
    }
    const userRoles = await UserRoles.getRolesForUser(
      "public",
      session.getUserId()
    );
    if (userRoles.roles.includes("canManageCart")) {
      return true;
    }

    // this may not be right, I need to check if the current user session owns the order item. So I think I need to return the user and then check the user superTokenUserId against the session.getUserId() rather than doing a look up on the order item itself

    const orderItem = await ctx.dataSources.db.cartItem.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return orderItem.user.superTokenUserId === session.getUserId()
      ? true
      : false;
  }
);

const canReadProducts = rule({ cache: "contextual" })(
  async (_, __, ctx: DataSourceContext) => {
    const session = await withSession(ctx, async (session) => session);
    if (!session) {
      return false;
    }
    if (!session.getUserId()) {
      return false;
    }
    const userRoles = await UserRoles.getRolesForUser(
      "public",
      session.getUserId()
    );

    return userRoles.roles.includes("canManageProducts");
  }
);

const canManageUsers = rule({ cache: "contextual" })(
  async (_, __, ctx: DataSourceContext) => {
    const session = await withSession(ctx, async (session) => session);
    if (!session) {
      return false;
    }
    if (!session.getUserId()) {
      return false;
    }
    const userRoles = await UserRoles.getRolesForUser(
      "public",
      session.getUserId()
    );
    if (userRoles.roles.includes("canManageUsers")) {
      return true;
    }

    const user = await ctx.dataSources.db.user.findUnique({
      where: {
        superTokenUserId: session.getUserId(),
      },
    });

    return user.role === "ADMIN" ? true : false;
  }
);

export default shield({
  Query: {
    allOrders: and(isAuthenticated, canManageOrderItems),
    order: and(isAuthenticated, canManageOrderItems),
  },
  Mutation: {
    // createProduct: and(isAuthenticated, canManageProducts),
    // createUser: and(isAuthenticated, canManageUsers),
    // addToCart: and(isAuthenticated, canOrder),
    checkout: and(isAuthenticated, canOrder),
    // deleteCartItem: and(isAuthenticated, canManageOrderItems),
  },
});
