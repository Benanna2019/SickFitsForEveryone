import { Resolvers } from "./types";
import stripeConfig from "./utils";
import { withSession } from "./withSession";

export const resolvers: Resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    productsForHome: (_, { take, skip }, { dataSources }) => {
      return dataSources.db.product.findMany({
        take,
        skip,
      });
    },
    productsCount: (_, __, { dataSources }) => {
      return dataSources.db.product.count();
    },
    product: (_, { id }, { dataSources }) => {
      return dataSources.db.product.findUnique({
        where: { id: id },
      });
    },
    user: async (_, __, contextValue) => {
      return await withSession(contextValue, async (session) => {
        if (!session) {
          return null;
        }
        if (!session.getUserId()) {
          return null;
        }
        const user = await contextValue.dataSources.db.user.findUnique({
          where: {
            superTokenUserId: session.getUserId(),
          },
          include: {
            cart: {
              include: {
                product: {
                  include: { photo: true },
                },
              },
            },
          },
        });
        return user;
      });
    },
    allOrders: async (_, __, contextValue) => {
      return await withSession(contextValue, async (session) => {
        if (!session) {
          return null;
        }
        if (!session.getUserId()) {
          return null;
        }
        const userOrders = await contextValue.dataSources.db.order.findMany({
          where: {
            user: {
              superTokenUserId: session.getUserId(),
            },
          },
          include: {
            user: true,
            items: {
              include: {
                photo: true,
              },
            },
          },
        });
        return userOrders;
      });
    },
    order: async (_, { id }, contextValue) => {
      return await withSession(contextValue, async (session) => {
        if (!session) {
          return null;
        }
        if (!session.getUserId()) {
          return null;
        }
        const userOrder = await contextValue.dataSources.db.order.findUnique({
          where: {
            id,
          },
          include: {
            user: true,
            items: {
              include: {
                photo: true,
              },
            },
          },
        });
        return userOrder;
      });
    },
  },
  Product: {
    photo: ({ photoId }, _, { dataSources }) => {
      return dataSources.db.productImage.findUnique({
        where: { id: photoId },
      });
    },
    user: ({ userId }, _, { dataSources }) => {
      return dataSources.db.user.findUnique({
        where: { id: userId },
      });
    },
  },
  Mutation: {
    createProduct: async (
      _,
      { name, description, price, status, image },
      { dataSources }
    ) => {
      // I'll need to take the image that I get and the upload it to Upload Thing
      // Probably can just use the utapi package with the upload thing secret key and thatll be good.
      // Then return that url and attach it to the photo image field below

      return await dataSources.db.product.create({
        data: {
          name,
          description,
          price,
          status,
          photo: {
            create: {
              image,
              altText: name,
            },
          },
        },
      });
    },
    addToCart: async (_, { productId }, contextValue) => {
      // pass session and token down later on use those to verify the session
      return await withSession(contextValue, async (session) => {
        if (!session) {
          return null;
        }
        if (!session.getUserId()) {
          return null;
        }

        const { dataSources } = contextValue;
        const superTokenUserId = session.getUserId();
        // 2. Query the current users cart
        const allCartItems = await dataSources.db.cartItem.findMany({
          where: { user: { superTokenUserId }, product: { id: productId } },
        });

        const [existingCartItem] = allCartItems;
        if (existingCartItem) {
          console.log(existingCartItem);
          console.log(
            `There are already ${existingCartItem.quantity}, increment by 1!`
          );
          // 3. See if the current item is in their cart
          // 4. if itis, increment by 1
          return await dataSources.db.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + 1 },
          });
        }
        // 4. if it isnt, create a new cart item!
        return await dataSources.db.cartItem.create({
          data: {
            quantity: 1,
            product: { connect: { id: productId } },
            user: { connect: { superTokenUserId } },
          },
        });
      });
    },
    checkout: async (_, { token }, contextValue) => {
      return await withSession(contextValue, async (session) => {
        if (!session) {
          return null;
        }
        if (!session.getUserId()) {
          return null;
        }

        const { dataSources } = contextValue;
        const superTokenUserId = session.getUserId();
        // 1.5 Query the current user
        const user = await dataSources.db.user.findUnique({
          where: { superTokenUserId },
          include: {
            cart: {
              include: {
                product: {
                  include: { photo: true },
                },
              },
            },
          },
        });

        console.dir(user, { depth: null });
        // 2. calc the total price for their order
        const cartItems = user.cart.filter((cartItem) => cartItem.product);
        const amount = cartItems.reduce((tally: number, cartItem: any) => {
          return tally + cartItem.quantity * cartItem.product.price;
        }, 0);
        console.log(amount);
        // 3. create the charge with the stripe library
        const charge = await stripeConfig.paymentIntents
          .create({
            amount,
            currency: "USD",
            confirm: true,
            payment_method: token,
            return_url: "http://localhost:5173",
          })
          .catch((err) => {
            console.log("err", err);
            throw new Error(err.message);
          });
        console.log(charge);
        // 4. Convert the cartItems to OrderItems
        const orderItems = cartItems.map((cartItem) => {
          const orderItem = {
            name: cartItem.product.name,
            description: cartItem.product.description,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            photo: { connect: { id: cartItem.product.photo.id } },
          };
          return orderItem;
        });
        console.log("gonna create the order");
        // 5. Create the order and return it
        const order = await dataSources.db.order.create({
          data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { superTokenUserId } },
          },
        });
        // 6. Clean up any old cart item
        const cartItemIds = user.cart.map((cartItem) => cartItem.id);
        console.log("gonna create delete cartItems");
        for (const cartItemId of cartItemIds) {
          await dataSources.db.cartItem.delete({
            where: { id: cartItemId },
          });
        }
        return order;
      });
    },
    deleteCartItem: async (_, { id }, contextValue) => {
      return await withSession(contextValue, async (session) => {
        if (!session) {
          return null;
        }
        if (!session.getUserId()) {
          return null;
        }

        const { dataSources } = contextValue;
        const superTokenUserId = session.getUserId();
        const cartItem = await dataSources.db.cartItem.findUnique({
          where: { id },
          include: { user: true },
        });
        if (!cartItem) {
          throw new Error("No cart item found!");
        }
        if (cartItem.user.superTokenUserId !== superTokenUserId) {
          throw new Error("You don't have permission to do this!");
        }
        return await dataSources.db.cartItem.delete({
          where: { id },
        });
      });
    },
  },
};
