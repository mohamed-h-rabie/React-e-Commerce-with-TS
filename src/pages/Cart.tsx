import { Heading } from "@components/common";

import CartList from "@components/eCommerece/CartList/CartList";
import CartSubtotalPrice from "@components/eCommerece/CartSubtotalPrice/CartSubtotalPrice";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import Loading from "@components/feedback/loading/Loading";
import useCart from "@hooks/useCart";

export default function Cart() {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useCart();
  return (
    <>
      <Heading title="Cart" />
      <Loading loading={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <LottieHandler type="empty" message="Your Cart is Empty" />
        )}
      </Loading>
    </>
  );
}
