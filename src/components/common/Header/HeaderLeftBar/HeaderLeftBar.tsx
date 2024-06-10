import HeaderCounter from "../HeaderCounter/HeaderCounter";

import CartIcon from "@assets/svg/cart.svg?react";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import { getTotalQuantity } from "@store/cart/selectors";
import styles from "./styles.module.css";
const { headerLeftBar } = styles;
export default function HeaderLeftBar() {
  let Cartquantity = useAppSelector(getTotalQuantity);
  let totalWishlistItems = useAppSelector(
    (state) => state.wishlist.itemsId
  ).length;
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        svgIcon={<WishlistIcon />}
        title="Wishlist"
        totalQuantity={totalWishlistItems}
      />
      <HeaderCounter
        to="cart"
        svgIcon={<CartIcon />}
        title="Cart"
        totalQuantity={Cartquantity}
      />
    </div>
  );
}
