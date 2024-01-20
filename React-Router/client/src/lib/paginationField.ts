import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    read(existing = [], { args, cache }: any) {
      const { skip, take } = args;

      // Read the number of items on the page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?.productsCount;
      const page = skip / take + 1;
      const pages = Math.ceil(count / take);

      // Check if we have existing items

      const items = existing.slice(skip, skip + take).filter((item) => item);
      // If
      // there are items
      // AND there are not enough items to satisfy how many
      // were requested
      // AND we are on the last page
      // THEN JUST SEND IT
      if (items.length && items.length !== take && page === pages) {
        return items;
      }
      if (items.length !== take) {
        // Means we do not have any items
        // We must now fetch them from the network
        return false;
      }

      // If there are items, return them from the cache
      // We do not need to go to the network

      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        );
        return items;
      }

      return false;

      // Firsthing it does is ask the
      // read function for those items

      // We can either do one of two things:

      // First things we can do is return the items
      // because theya re already in the cache

      // The other thing we can do is to return
      //f alse from here, (network request)
    },
    merge(existing: any, incoming: any, { args }: any) {
      const { skip, take } = args;
      // This runs when the apollo client comes back
      // from the network with our products
      console.log(`merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      return merged;
    },
  };
}
