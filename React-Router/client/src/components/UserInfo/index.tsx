import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";

const CURRENT_USER_QUERY = gql(`
  query Query {
    user {
      id
      email
      superTokenUserId
      name
      cart {
        id
        quantity
        product {
          id
          price
          name
          description
          photo {
            id
            image
            altText
          }
        }
      }
    }
  }
`);

export function useUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  console.log("This is the console logged user data", data);

  return {
    data,
    loading,
    error,
  };
}

export { CURRENT_USER_QUERY };
