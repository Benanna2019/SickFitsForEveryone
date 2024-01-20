import Session, { SessionContainer } from "supertokens-node/recipe/session";
import { GraphQLError } from "graphql";

export async function withSession<T>(
  contextValue: any,
  resolver: (session: SessionContainer) => Promise<T>
) {
  try {
    let session = await Session.getSession(contextValue.req, contextValue.res);
    return await resolver(session);
  } catch (err) {
    if (Session.Error.isErrorFromSuperTokens(err)) {
      throw new GraphQLError("Session related error", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: {
            status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401,
          },
        },
      });
    }
  }
}
