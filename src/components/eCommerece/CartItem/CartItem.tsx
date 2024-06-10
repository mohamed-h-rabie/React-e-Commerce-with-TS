import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { memo } from "react";
const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};
export default memo(function CartItem({
  title,
  img,
  price,
  quantity,
  max,
  changeQuantityHandler,
  id,
  removeItemHandler,
}: CartItemProps) {
  const QuantityOptions = Array(max)
    .fill(0)
    .map((_, idx) => {
      const quantity = ++idx;
      return (
        <option key={idx} value={quantity}>
          {quantity}
        </option>
      );
    });

  function changeQuantity(event: React.ChangeEvent<HTMLSelectElement>) {
    const newQuantity = +event.target.value;
    changeQuantityHandler(id, newQuantity);
  }
  function removeItem() {
    removeItemHandler(id);
  }
  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={removeItem}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select
          aria-label="Default select example"
          value={quantity}
          onChange={changeQuantity}
        >
          {QuantityOptions}
        </Form.Select>
      </div>
    </div>
  );
});
