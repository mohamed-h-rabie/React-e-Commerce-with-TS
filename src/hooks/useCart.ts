import {
  actGetProductsByitems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanupOfCartItems,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
function useCart() {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByitems());

    return () => {
      dispatch(cleanupOfCartItems());
      promise.abort();
    };
  }, [dispatch]);

  const products = productsFullInfo.map((product) => {
    return { ...product, quantity: items[product.id] };
  });

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  return { removeItemHandler, changeQuantityHandler, products, loading, error };
}

export default useCart;
