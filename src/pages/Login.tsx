import { Heading } from "@components/common";
import { Navigate } from "react-router-dom";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Input } from "@components/Form";
import { useLogin } from "@hooks/useLogin";

export default function Login() {
  const {
    accessToken,
    searchParams,
    handleSubmit,
    submitForm,
    register,
    error,
    loading,
    formErrors,
  } = useLogin();
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="Login" />
      <Row>
        {searchParams.get("message") === "account_created" && (
          <Alert variant="success">
            Your account successfully created, please login
          </Alert>
        )}
        {searchParams.get("message") === "login_required" && (
          <Alert variant="success">
            You need to login to view this content
          </Alert>
        )}

        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email"
              register={register}
              error={formErrors.email?.message}
              name="email"
            />

            <Input
              type="password"
              label="Password"
              register={register}
              error={formErrors.password?.message}
              name="password"
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner>
                  <span>loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
          {error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Col>
      </Row>
    </>
  );
}
