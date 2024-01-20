import { useQuery } from "@apollo/client";
import { perPage } from "../../lib/constants";
import Product from "../Product";
import { gql } from "../../__generated__";
import "./products.css";

export const ALL_PRODUCTS_QUERY = gql(`
query ProductsForHome($take: Int, $skip: Int!) {
    productsForHome(take: $take, skip: $skip) {
      id
      name
      description
      status
      price
      photo {
        id
        image
        altText
      }
    }
  }
`);

export default function Products({ page }: { page: number }) {
  console.log("This is the console logged page", page);
  console.log("This is the perpage console log", perPage);
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div className="product__list__styles">
        {data?.productsForHome.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
