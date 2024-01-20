import { useQuery, gql } from "@apollo/client";
import DisplayError from "../DisplayError";
import "./single-product.css";

const SINGLE_ITEM_QUERY = gql`
  query SingleProductQuery($id: ID!) {
    product(id: $id) {
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
`;

export default function SingleProduct({ id }: { id: string }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <DisplayError error={error} />;
  console.log("This is the console logged data", data);
  const { product } = data;
  return (
    <div className="single__product__style">
      <img src={product?.photo?.image} alt={product?.photo?.altText} />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
