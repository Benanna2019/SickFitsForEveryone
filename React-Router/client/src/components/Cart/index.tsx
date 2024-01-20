import formatMoney from "../../lib/formatMoney";
import { useUser } from "../UserInfo";
import calcTotalPrice from "../../lib/calc-total-price";
import RemoveFromCart from "../RemoveFromCart";
import { Checkout } from "../Checkout";
import { CartItem as CartItemType } from "../../__generated__/graphql";
import "./cart-styles.css";
import "./close-button-styles.css";
import "./supreme-styles.css";
import "./cart-item-styles.css";
import { useCart } from "../../lib/cart-state";

interface CartItemProps {
  cartItem: CartItemType;
}

function CartItem({ cartItem }: CartItemProps) {
  const { product } = cartItem;
  console.log("This is the cartItem", cartItem);
  if (!product) return null;
  return (
    <li className="cart__item__styles">
      <img width="100" src={product.photo.image} alt={product.photo.altText} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {cartItem.quantity && formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id as string} />
    </li>
  );
}

export default function Cart() {
  const { data, loading, error } = useUser();
  const { closeCart } = useCart();
  if (loading) return null;
  if (error) return <p>Error: {error.message}</p>;
  const me = data?.user;

  if (!me) return null;

  return (
    <>
      <header>
        <h3 className="supreme__h3">{me.name ? me.name + "'s" : ""} Cart</h3>
        <button className="close__button" onClick={closeCart}>
          &times;
        </button>
      </header>
      <ul>
        {me?.cart?.map((cartItem) => (
          <CartItem key={cartItem?.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </>
  );
}
