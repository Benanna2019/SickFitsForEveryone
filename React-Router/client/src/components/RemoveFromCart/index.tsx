import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import "./remove-from-cart-styles.css";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache: any, payload: any) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }: { id: string }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    optimisticResponse: {
      deleteCartItem: {
        __typename: "CartItem",
        id,
      },
    },
  });
  return (
    <button
      className="big__button"
      //@ts-ignore
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      &times;
    </button>
  );
}
