import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

export default function Error() {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <LottieHandler type="notFound" className="notFound" />
        <Link to="/" replace={true}>
          How about going back to safety?
        </Link>
      </div>
    </Container>
  );
}
