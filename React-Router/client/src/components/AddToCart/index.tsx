import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../UserInfo";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

//

export default function AddToCart({ id }: { id: string }) {
  const [addToCart, { data, loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  console.log("This is the console logged data", data);

  return (
    //@ts-ignore
    <button disabled={loading} type="button" onClick={addToCart}>
      Add{loading && "ing"} To Cart
    </button>
  );
}

//
//
