import { TProduct } from "@types";
import styles from "../CartSubtotalPrice/styles.module.css";
type TPriceProps = {
  products: TProduct[];
};
export default function CartSubtotalPrice({ products }: TPriceProps) {
  const totalPrice = products.reduce((acc, product) => {
    const price = product.price;
    const quantity = product.quantity;
    if (quantity && typeof quantity === "number") {
      return acc + +price * quantity;
    } else {
      return acc;
    }
  }, 0);

  return (
    <div className={styles.container}>
      <span>Subtotal: </span>
      <span>{totalPrice.toFixed(2)} EGP</span>
    </div>
  );
}
