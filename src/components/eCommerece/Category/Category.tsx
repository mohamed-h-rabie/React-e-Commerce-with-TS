import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { TCategories } from "@types";
const { category, categoryImg, categoryTitle } = styles;

export default function Category({ prefix, title, img }: TCategories) {
  return (
    <div className={category}>
      <Link to={`/categories/products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
}
