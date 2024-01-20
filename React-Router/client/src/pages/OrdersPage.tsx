import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { Order } from "../__generated__/graphql";
import { Link } from "react-router-dom";
import DisplayError from "../components/DisplayError";
import formatMoney from "../lib/formatMoney";
import "../components/additional-styles/order-item-styles.css";
import "../components/additional-styles/order-list-styles.css";
import "../components/additional-styles/order-styles.css";

// need to work on the permissions side of things
// this allOrders query, based off of permissions, should only return to the signed in user their orders but I don't have to handle that with the passing of any sort of id or token.

const USER_ORDERS_QUERY = gql(`
  query USER_ORDERS_QUERY {
    allOrders {
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

function countItemsInAnOrder(order: Order) {
  return order?.items?.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <div>
      <h2>You have {data?.allOrders.length} orders!</h2>
      <ul className="order__list__styles">
        {data?.allOrders.map((order) => (
          <li className="order__item__styles">
            <Link to={`/orders/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInAnOrder(order)} Items</p>
                  <p>
                    {order?.items?.length} Product
                    {order?.items?.length === 1 ? "" : "s"}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order?.items?.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image}
                      alt={item.photo?.altText}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
