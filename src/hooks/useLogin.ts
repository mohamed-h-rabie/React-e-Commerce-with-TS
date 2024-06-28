import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUi } from "@store/auth/authSlice";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema, signInType } from "@validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
export const useLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

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

  return {
    accessToken,
    searchParams,
    handleSubmit,
    submitForm,
    register,
    formErrors,
    loading,
    error,
  };
};
