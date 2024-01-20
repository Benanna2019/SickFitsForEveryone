import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Products from "../components/Products";

export default function ProductsPage() {
  const [searchParams, _] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </div>
  );
}
