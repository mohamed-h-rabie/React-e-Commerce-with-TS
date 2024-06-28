import { Heading } from "@components/common";
import { Input } from "@components/Form";
import { useRegister } from "@hooks/useRegister";
import { Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Navigate } from "react-router-dom";

export default function Register() {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    emailOnBlurHandler,
    emailAvailabilityStatus,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label=" firstName"
              register={register}
              error={formErrors.firstName?.message}
              name="firstName"
            />

            <Input
              register={register}
              error={formErrors.lastName?.message}
              label="last Name"
              name="lastName"
            />

            <Input
              register={register}
              error={formErrors.email?.message}
              label="email address"
              name="email"
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              failed={
                emailAvailabilityStatus === "notAvailable"
                  ? "This email is notAvailable for use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />

            <Input
              register={register}
              error={formErrors.password?.message}
              label="password"
              name="password"
              type="password"
            />

            <Input
              type="password"
              register={register}
              name="confirmPassword"
              error={formErrors.confirmPassword?.message}
              label="confirm password"
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking" || loading === "pending"
                  ? true
                  : false
              }
            >
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
