// import { useSearchParams } from "react-router-dom";
import { useSearch } from "@tanstack/react-router";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import { productPage } from "../routes/product-routes";

export default function ProductsPage() {
  // const [searchParams, _] = useSearchParams();
  const { page } = useSearch({
    from: productPage.fullPath,
  });

  console.log("page", page);

  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </div>
  );
}
