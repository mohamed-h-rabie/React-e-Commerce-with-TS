import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerece";

import Loading from "@components/feedback/loading/Loading";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";
import useCategories from "@hooks/useCategories";
export default function Catogeries() {
  const { loading, error, records } = useCategories();
  return (
    <Container>
      <Heading title="Categories" />
      <Loading loading={loading} error={error} type="category">
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
          emptyMessage="There is No Category"
        />
      </Loading>
    </Container>
  );
}
