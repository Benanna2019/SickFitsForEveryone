import { useQuery, gql } from "@apollo/client";
// import { useSearchParams } from "react-router-dom";
import DisplayError from "../DisplayError";
import { perPage } from "../../lib/constants";
import "./pagination-styles.css";
import { Link } from "@tanstack/react-router";
import { productPage } from "../../routes/product-routes";

export const PAGINATION_QUERY = gql(`
  query ProductsCountQuery {
    productsCount
  }
`);

export default function Pagination({ page }: { page: number }) {
  // const [_, setSearchParams] = useSearchParams();
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading)
    return (
      <div className="pagination__styles">
        <a>
          <span>Prev</span>
        </a>
        <p>Page of </p>
        <p>Items Total</p>
        <a>
          <span>Next</span>
        </a>
      </div>
    );
  if (error) return <DisplayError error={error} />;
  const count = data.productsCount;
  const pageCount = Math.ceil(count / perPage);
  console.log("This is the page count", pageCount);

  return (
    <div className="pagination__styles">
      <Link
        aria-disabled={page <= 1}
        from={productPage.fullPath}
        to="/"
        search={(prev) => ({ page: prev.page - 1 })}
        // onClick={() => setSearchParams({ page: String(page - 1) })}
      >
        <span aria-disabled={page <= 1}>Prev</span>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link
        aria-disabled={page >= pageCount}
        from={productPage.fullPath}
        search={(prev) => ({ page: prev.page + 1 })}
        // onClick={() => setSearchParams({ page: String(page + 1) })}
      >
        <span aria-disabled={page >= pageCount}>Next</span>
      </Link>
    </div>
  );
}
