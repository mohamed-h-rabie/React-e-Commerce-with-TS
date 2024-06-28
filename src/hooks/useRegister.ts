import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUi } from "@store/auth/authSlice";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpSchema, signUpType } from "@validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useNavigate } from "react-router-dom";
export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors: formErrors },
    getFieldState,
    trigger,
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

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
  return {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    emailOnBlurHandler,
    emailAvailabilityStatus,
  };
};
