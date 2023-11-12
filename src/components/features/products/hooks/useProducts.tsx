import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { ProductActionCreators } from "../../../../redux/actionCreators";
import React from "react";

const { fetchProducts } = ProductActionCreators;

type UseProducts = { limit: number; skip?: number; isVisible: boolean };

const useProducts = ({ limit, isVisible }: UseProducts) => {
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(0);

  const dispatch = useDispatch();

  const { products, combinedProducts, loading, error } = useSelector(
    (state: any) => state.products,
    shallowEqual
  );

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (isVisible) {
      dispatch(
        fetchProducts({
          limit,
          skip: page * limit,
          signal,
          callbackSuccess: () => {
            setPage((p) => p + 1);
            setHasMore(!!products.length);
          },
        }) as any
      );
    }

    return () => {
      abortController.abort();
    };
  }, [isVisible]);

  return {
    products: combinedProducts,
    loading,
    error,
    page,
    limit,
    hasMore,
    setPage,
    setHasMore,
  };
};

export default useProducts;
