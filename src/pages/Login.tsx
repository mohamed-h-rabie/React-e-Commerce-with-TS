import { Heading } from "@components/common";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema, signInType } from "@validations/signInSchema";
import { Input } from "@components/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUi } from "@store/auth/authSlice";
import { useEffect } from "react";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading } = useAppSelector((state) => state.auth);
  const submitForm: SubmitHandler<signInType> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    const { email, password } = data;
    dispatch(actAuthLogin({ email, password }))
      .unwrap()
      .then(() => navigate("/"));
  };
  useEffect(() => {
    return () => {
      dispatch(resetUi());
    };
  }, [dispatch]);
  return (
    <>
      <Heading title="Login" />
      <Row>
        {searchParams.get("message") === "account_created" && (
          <Alert variant="success">
            Your account successfully created, please login
          </Alert>
        )}

        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email"
              register={register}
              error={errors.email?.message}
              name="email"
            />

            <Input
              type="password"
              label="Password"
              register={register}
              error={errors.password?.message}
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
