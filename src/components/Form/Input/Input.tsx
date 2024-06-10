import Form from "react-bootstrap/Form";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

type TInputProps<TFieldValues extends FieldValues> = {
  label: string;
  type?: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  failed?: string;
  disabled?: boolean;
};
export default function Input<TFieldValues extends FieldValues>({
  label,
  type = "text",
  name,
  register,
  error,
  onBlur,
  formText,
  success,
  disabled,
  failed,
}: TInputProps<TFieldValues>) {
  function onBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  }
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        isInvalid={error || failed ? true : false}
        onBlur={onBlurHandler}
        isValid={success ? true : false}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">{failed}</Form.Control.Feedback>

      {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  );
}
