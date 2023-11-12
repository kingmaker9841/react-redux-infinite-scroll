import styled from "styled-components";

const Products = styled.div``;

const ProductBoard = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px 0;
`;

const IndividualProductContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 20px 5px;
  height: 150px;
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 150px;
`;

const DetailsContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const EllipsisText = styled.h4`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
`;

const imageUrl = "https://picsum.photos/200/300";

function DisplayProduct({ products }: any) {
  if (!Array.isArray(products)) return null;
  return (
    <Products>
      {products.map((product) => (
        <div style={{ border: "1px solid black" }} key={product.id}>
          <ProductBoard />
          <IndividualProductContainer>
            <ImageContainer>
              <img
                width={"100%"}
                height="100%"
                src={imageUrl}
                alt="image picsum"
              />
            </ImageContainer>
            <DetailsContainer>
              <EllipsisText>
                {product.title + "slkdjfsd sldkjf sdkljfsdkl"}
              </EllipsisText>
              <p>{product.price}</p>
            </DetailsContainer>
          </IndividualProductContainer>
        </div>
      ))}
    </Products>
  );
}

export default DisplayProduct;
