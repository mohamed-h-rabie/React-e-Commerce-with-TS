import { Container } from "react-bootstrap";
import GridList from "@components/common/GridList/GridList";
import { Product } from "@components/eCommerece";
import { Heading } from "@components/common";

import Loading from "@components/feedback/loading/Loading";
import useWishlist from "@hooks/useWishlist";

export default function Wishlist() {
  const { loading, error, records } = useWishlist();
  return (
    <Container>
      <Heading title="Your Wishlist" />
      <Loading loading={loading} error={error} type="product">
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="Your Whislist is Empty"
        />
      </Loading>
    </Container>
  );
}
