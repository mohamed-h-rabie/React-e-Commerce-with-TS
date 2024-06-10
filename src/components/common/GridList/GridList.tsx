import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Col, Row } from "react-bootstrap";

type TGridList<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage: string;
};
type HasId = { id?: number };

export default function GridList<T extends HasId>({
  records,
  renderItem,
  emptyMessage,
}: TGridList<T>) {
  const list =
    records.length > 0 ? (
      records.map((record) => {
        return (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(record)}
          </Col>
        );
      })
    ) : (
      <LottieHandler type="empty" message={emptyMessage} />
    );
  return <Row>{list}</Row>;
}
