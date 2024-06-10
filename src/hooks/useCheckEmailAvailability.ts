import axios from "axios";
import { useState } from "react";
type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";
function useCheckEmailAvailability() {
  const [prevEmail, setEnteredEmail] = useState<null | string>(null);
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");
  async function checkEmailAvailability(email: string) {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const response = await axios.get(`/users?email=${email}`);
      console.log(response);

      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  }
  const resetCheckEmailAvailability = () => {
    setEnteredEmail(null);
    setEmailAvailabilityStatus("idle");
  };
  return {
    prevEmail,
    emailAvailabilityStatus,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
}

export default useCheckEmailAvailability;
