import notFound from "@assets/lottie/notFound.json";
import empty from "@assets/lottie/empty.json";
import error from "@assets/lottie/error.json";
import loading from "@assets/lottie/loading.json";
import Lottie from "lottie-react";

const lotties = {
  notFound,
  empty,
  error,
  loading,
};
type TLotties = {
  type: keyof typeof lotties;
  message?: string;
  className?: string;
};
export default function LottieHandler({ type, message, className }: TLotties) {
  const lottie = lotties[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };

  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
}
