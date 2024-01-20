export default function calcTotalPrice(cart: any) {
  return cart?.reduce((tally: any, cartItem: any) => {
    if (!cartItem.product) return tally; // products can be deleted, but they could still be in your cart
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}

// fix types after i figure out cart
