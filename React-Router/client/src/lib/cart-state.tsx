import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext<{
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}>({
  cartOpen: false,
  setCartOpen: (value: boolean) => {},
  toggleCart: () => {},
  closeCart: () => {},
  openCart: () => {},
});
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }: { children: React.ReactNode }) {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer!

  // Closed cart by default
  const [cartOpen, setCartOpen] = useState(false);

  console.log("cart open status", cartOpen);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
