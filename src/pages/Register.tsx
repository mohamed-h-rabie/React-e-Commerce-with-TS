import { Heading } from "@components/common";
import { Input } from "@components/Form";
import { Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
////////////////////////////////
import { signUpSchema, signUpType } from "@validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
////////////////////////////////
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
////////////////////////////////
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUi } from "@store/auth/authSlice";
import { useEffect } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,

    formState: { errors },
    getFieldState,
    trigger,
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    prevEmail,
    emailAvailabilityStatus,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();
  const submitForm: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => navigate("/login?message=account_created"));
  };
  async function emailOnBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && prevEmail !== value) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && prevEmail) {
      resetCheckEmailAvailability();
    }
  }
  useEffect(() => {
    return () => {
      dispatch(resetUi());
    };
  }, []);
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label=" firstName"
              register={register}
              error={errors.firstName?.message}
              name="firstName"
            />

            <Input
              register={register}
              error={errors.lastName?.message}
              label="last Name"
              name="lastName"
            />

            <Input
              register={register}
              error={errors.email?.message}
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
              error={errors.password?.message}
              label="password"
              name="password"
              type="password"
            />

            <Input
              type="password"
              register={register}
              name="confirmPassword"
              error={errors.confirmPassword?.message}
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
