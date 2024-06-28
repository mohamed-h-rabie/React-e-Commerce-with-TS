import styles from "./styles.module.css";
import { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { addTocart } from "@store/cart/cartSlice";
import { useEffect, useState, memo } from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { actLikeToogle } from "@store/wishlist/wishlistSlice";
import { Button, Modal, Spinner } from "react-bootstrap";

const { product, productImg, maximumNotice, wishlistBtn } = styles;

export default memo(function Product({
  title,
  img,
  price,
  id,
  max,
  quantity,
  isLiked,
  isAuthenticated,
}: TProduct) {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isDisabled) return;
    const debounced = setTimeout(() => {
      setIsDisabled(false);
    }, 300);
    return () => {
      clearTimeout(debounced);
    };
  }, [isDisabled]);

  function handleAddProduct() {
    dispatch(addTocart(id));
    setIsDisabled((isDisabled) => !isDisabled);
  }
  function likeToogleHandler() {
    if (isAuthenticated) {
      setIsLoading(true);
      dispatch(actLikeToogle(id))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    } else {
      setShowModal(true);
    }
  }

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to login first to add this item to your wishlist.
        </Modal.Body>
      </Modal>
      <div className={product}>
        <div className={wishlistBtn} onClick={likeToogleHandler}>
          {isLoading ? (
            <button disabled={isLoading}>
              <Spinner animation="border" size="sm" variant="primary" />
            </button>
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{price}EGP</h3>
        <p className={maximumNotice}>
          {quantityReachedToMax
            ? "You reach to the limit"
            : `You can add ${currentRemainingQuantity} item(s)`}
        </p>
        <Button
          variant="info"
          style={{ color: "white" }}
          onClick={handleAddProduct}
          disabled={isDisabled || quantityReachedToMax}
        >
          {isDisabled ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            "Add to cart"
          )}
        </Button>
      </div>
    </>
  );
});
