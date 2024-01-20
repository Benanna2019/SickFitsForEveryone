import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import DisplayError from "../components/DisplayError";
import formatMoney from "../lib/formatMoney";
import { useParams } from "react-router-dom";

const SINGLE_ORDER_QUERY = gql(`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      user {
        superTokenUserId
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          id
          image 
          altText
        }
      }
    }
  }
`);

// There should be no way for someone to get to an order id page for an order id that doesn't exist.
// so we can just return 'if (order)' because the data that is coming back from the query may be undefined
// otherwise there should only be loading and error states.

// Once a user has order something that order id should forever exist unless they delete an account with all user info attached to it.
// in that case, if they come back to this site they should still hit the error page, nor should they be allowed to navigate to an order page without being logged in.
export default function SingleOrderPage() {
  const params = useParams() as { orderId: string };
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: params.orderId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const order = data?.order;
  console.log("This is the console logged order", order);

  if (order) {
    return (
      <div className="order__styles">
        <p>
          <span>Order Id:</span>
          <span>{order.id}</span>
        </p>
        <p>
          <span>Charge:</span>
          <span>{order.charge}</span>
        </p>
        <p>
          <span>Order Total:</span>
          <span>{formatMoney(order.total)}</span>
        </p>
        <p>
          <span>ItemCount:</span>
          <span>{order.items?.length}</span>
        </p>
        <div className="items">
          {order.items?.map((item) => (
            <div className="order-item" key={item.id}>
              <img src={item.photo.image} alt={item.photo.altText} />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Qty: {item.quantity}</p>
                <p>Each: {formatMoney(item.price)}</p>
                <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
