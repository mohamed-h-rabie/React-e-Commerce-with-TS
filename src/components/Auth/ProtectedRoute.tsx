import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
type TProps = {
  children: React.ReactNode;
};
function ProtectedRoute({ children }: TProps) {
  // 1. Load the authenticated user
  const { accessToken } = useAppSelector((state) => state.auth);

  // 2. If there is NO authenticated user, redirect to the /login
  if (!accessToken) {
    return <Navigate to="/login?message=login_required" />;
  }

  // 4. If there IS a user, render the app
  if (accessToken) return children;
}

export default ProtectedRoute;
