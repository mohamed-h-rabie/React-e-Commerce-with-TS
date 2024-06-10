import { isAxiosError } from "axios";
function isAxiosErrorHandler(error: unknown) {
  if (isAxiosError(error)) {
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  } else {
    return "An unexpected error occurred";
  }
}

export default isAxiosErrorHandler;
