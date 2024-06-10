import { Container } from "react-bootstrap";
import GridList from "@components/common/GridList/GridList";
import { Product } from "@components/eCommerece";
import { Heading } from "@components/common";

import Loading from "@components/feedback/loading/Loading";
import { TProduct } from "@types";
import useProducts from "@hooks/useProducts";

export default function Products() {
  const { productFullInfo, loading, error, productsParams } = useProducts();
  return (
    <Container>
      <Heading title={`${productsParams?.toUpperCase()} Products`} />

      <Loading loading={loading} error={error} type="product">
        <GridList<TProduct>
          records={productFullInfo}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="There is No Products"
        />
      </Loading>
    </Container>
  );
}
