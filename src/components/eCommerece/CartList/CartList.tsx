import { TProduct } from "@types";
import { CartItem } from "..";
type CartListItemProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};
export default function CartList({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: CartListItemProps) {
  const renderList = products.map((product) => (
    <CartItem
      key={product.id}
      {...product}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <>{renderList}</>;
}
