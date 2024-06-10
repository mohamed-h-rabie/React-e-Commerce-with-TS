import { TLoading } from "@types";
import CategorySkeleton from "../skeletons/categorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/productsSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/cartSkeleton/CartSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";
const skeletonType = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type TLoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonType;
};
export default function Loading({
  loading,
  error,
  children,
  type = "category",
}: TLoadingProps) {
  const Component = skeletonType[type];
  if (loading === "pending") {
    return <Component />;
  }
  if (loading === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />;
      </div>
    );
  }
  return <>{children}</>;
}
