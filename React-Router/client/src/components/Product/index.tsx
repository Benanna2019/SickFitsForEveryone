// import { Link } from "react-router-dom";
import { Link } from "@tanstack/react-router";
import formatMoney from "../../lib/formatMoney";
import DeleteProduct from "../DeleteProduct";
import AddToCart from "../AddToCart";
import { Product as ProductType } from "../../__generated__/graphql";
import "./product.css";

interface SingleProduct {
  product: ProductType;
}

export default function Product({ product }: SingleProduct) {
  return (
    <div className="item__styles">
      <img src={product?.photo?.image} alt={product.name} />
      <h3 className="product__title">
        <Link to="/products/$productId" params={{ productId: product.id }}>
          {product.name}
        </Link>
      </h3>
      <span className="price__tag">{formatMoney(product.price)}</span>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete an item */}
      <div className="buttonList">
        <Link to="/products/$productId" params={{ productId: product.id }}>
          Edit
        </Link>
        {/* id={product.id} */}
        <AddToCart id={product.id} />
        {/* id={product.id} */}
        <DeleteProduct>Delete</DeleteProduct>
      </div>
    </div>
  );
}
