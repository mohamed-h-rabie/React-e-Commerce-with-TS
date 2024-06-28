import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/Products/productsSlice.";
import { useParams } from "react-router-dom";
function useProducts() {
  const params = useParams();
  const productsParams = params.prefix;
  //////
  const dispatch = useAppDispatch();
  const { error, loading, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const whislistItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  /////////////

  ///////////////
  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string)
    );

    return () => {
      dispatch(productsCleanUp());
      promise.abort();
    };
  }, [dispatch, params]);

  const productFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: whislistItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));

  return { productsParams, error, loading, productFullInfo };
}

export default useProducts;
