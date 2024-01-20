import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserInfo";
import Profile from "../SignOut";
import { useCart } from "../../lib/cart-state";
import CartCount from "../CartCount";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import * as Dialog from "@radix-ui/react-dialog";
import "./nav.css";
import "../Cart/cart-styles.css";
import Cart from "../Cart";

export default function Nav() {
  const { data } = useUser();
  const navigate = useNavigate();
  const { cartOpen, setCartOpen } = useCart();
  return (
    <ul className="nav__list">
      <Link to="/">Products</Link>
      <SessionAuth>
        <>
          <Link to="/sell">Sell</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/reset">Reset</Link>
          <Profile />
          <Dialog.Root open={cartOpen} onOpenChange={setCartOpen}>
            <Dialog.Trigger>
              My Cart
              {data?.user && (
                <CartCount
                  count={
                    data?.user?.cart?.reduce(
                      (
                        tally,
                        cartItem // replace with Product type
                      ) => tally + (cartItem?.quantity ?? 0),
                      0
                    ) || 0
                  }
                />
              )}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="cart__styles">
                <Cart />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
      </SessionAuth>
      {!data?.user && (
        <>
          <button type="button" onClick={() => navigate("/auth")}>
            Sign In
          </button>
        </>
      )}
    </ul>
  );
}
