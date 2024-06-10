import { useAppSelector } from "@store/hooks";

import styles from "./styles.module.css";

import { getTotalQuantity } from "@store/cart/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;
type THeaderCounterProps = {
  svgIcon: React.ReactNode;
  to: string;
  title: string;
  totalQuantity: number;
};
export default function HeaderCounter({
  svgIcon,
  to,
  title,
  totalQuantity,
}: THeaderCounterProps) {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  let quantity = useAppSelector(getTotalQuantity);
  useEffect(() => {
    if (!quantity) return;
    setIsAnimate(true);
    let debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [quantity]);

  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
}
