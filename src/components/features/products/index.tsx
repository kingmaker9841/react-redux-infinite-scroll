import DisplayProduct from "./DisplayProduct";
import React from "react";
import styled from "styled-components";
import useProducts from "./hooks/useProducts";

const ProductsContainer = styled.div`
  width: 50vw;
  height: auto;
  border: 1px solid black;
`;

const options = {
  limit: 3,
  skip: 0,
};
const Ioptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

function ProductsComponent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const { products, loading, error, hasMore } = useProducts({
    ...options,
    isVisible,
  });
  const ref = React.useRef(null);

  const Icallback = (entries: any) => {
    const entry = entries[0];
    if (entry?.isIntersecting) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(Icallback, Ioptions);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  if (error) return <>Some Error happen</>;
  return (
    <div>
      <p>All Products</p>
      <ProductsContainer>
        <DisplayProduct
          innerRef={ref}
          products={products}
          isVisible={isVisible}
        />
      </ProductsContainer>
      <div ref={ref} style={{ height: "100px", border: "1px solid red" }}>
        {hasMore && loading && <span>Loading ...</span>}
      </div>
    </div>
  );
}

export default ProductsComponent;
