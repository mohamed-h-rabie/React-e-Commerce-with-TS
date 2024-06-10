import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetWishlist,
  productsFullInfoCleanUp,
} from "@store/wishlist/wishlistSlice";
function useWishlist() {
  const dispatch = useAppDispatch();
  const { error, loading, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
  }));
  useEffect(() => {
    const promise = dispatch(actGetWishlist());

    return () => {
      dispatch(productsFullInfoCleanUp());
      promise.abort();
    };
  }, [dispatch]);

  return { error, loading, records };
}

export default useWishlist;
