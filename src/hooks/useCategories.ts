import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetCategories,
  cleanupCategories,
} from "@store/categories/categoriesSlice.";

function useCategories() {
  const dispatch = useAppDispatch();
  const { error, loading, records } = useAppSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (!records.length) {
      const promise = dispatch(actGetCategories());

      return () => {
        dispatch(cleanupCategories());
        promise.abort();
      };
    }
  }, [dispatch]);
  return { error, loading, records };
}

export default useCategories;
