import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";

export default function SingleProductPage() {
  const params = useParams();
  console.log("params", params);
  return <SingleProduct id={params.productId as string} />;
}
