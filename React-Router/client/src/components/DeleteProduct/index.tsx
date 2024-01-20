// import { useMutation } from "@apollo/client";
// import gql from "graphql-tag";

// const DELETE_PRODUCT_MUTATION = gql`
//   mutation DELETE_PRODUCT_MUTATION($id: ID!) {
//     deleteProduct(id: $id) {
//       id
//       name
//     }
//   }
// `;

// function update(cache, payload) {
//   cache.evict(cache.identify(payload.data.deleteProduct));
// }

// { id, children }: { id: string; children: React.ReactNode }
export default function DeleteProduct({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
  //     variables: { id: id },
  //     update: update,
  //   });
  return <button type="button">{children}</button>;
}

// button props

// disabled={loading}
//       onClick={() => {
//         if (confirm("Are you sure that you want to delete this item?")) {
//           // go ahead and delete it
//           console.log("Deleting");
//           deleteProduct().catch((err) => alert(err.message));
//         }
//       }}
