import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Config } from "apollo-server-core";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import express from "express";
import cors from "cors";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { prisma } from "./db";
import type { DocumentNode } from "graphql";
import { syncUser } from "./syncUser";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./access";

supertokens.init({
  framework: "express",
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI:
      "https://st-dev-c9f98c60-b48c-11ee-9322-35d6a54c7b6a.aws.supertokens.io",
    apiKey: "iehZ7dQ07OutggHxPIPZkMW9pA",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "Sick Fits",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    Dashboard.init({
      admins: ["bass41992ben@gmail.com"],
    }),
    UserRoles.init(),
    ThirdPartyEmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signUp: async function (input) {
              // First we call the original implementation of signUpPOST.
              let response = await originalImplementation.thirdPartySignInUp(
                input
              );

              // Post sign up response, we check if it was successful
              if (
                response.status === "OK" &&
                response.user.loginMethods.length === 1
              ) {
                await syncUser(response.user.id);
              }
              return response;
            },
          };
        },
      },
      providers: [
        {
          config: {
            thirdPartyId: "google",
            clients: [
              {
                clientId:
                  "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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",
              },
            ],
          },
        },
        {
          config: {
            thirdPartyId: "github",
            clients: [
              {
                clientId: "467101b197249757c71f",
                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
              },
            ],
          },
        },
        {
          config: {
            thirdPartyId: "apple",
            clients: [
              {
                clientId: "4398792-io.supertokens.example.service",
                additionalConfig: {
                  keyId: "7M48Y4RYDL",
                  privateKey:
                    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                  teamId: "YWQCXGJRJL",
                },
              },
            ],
          },
        },
      ],
    }),
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(), // initializes session features
  ],
});

const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
//     credentials: true,
//   })
// );

// app.use(middleware());

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: Config["resolvers"]
) {
  const server = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions
    ),
    csrfPrevention: true,
    cache: "bounded",
  });
  await server.start().then(() => {
    app.use(
      express.json(),
      cors({
        origin: "http://localhost:5173",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
      }),
      middleware(),
      expressMiddleware(server, {
        // Note: This example uses the `req` and `res` argument to access headers,
        // but the arguments received by `context` vary by integration.
        // This means they vary for Express, Fastify, Lambda, etc.
        context: async ({ req, res }) => {
          return {
            dataSources: {
              db: prisma,
            },
            req,
            res,
          };
        },
      })
    );

    app.use(errorHandler());
    app.listen(4000, () => {
      console.log(`🚀 Server ready at http://localhost:4000`);
    });
  });
}

startApolloServer(typeDefs, resolvers);
