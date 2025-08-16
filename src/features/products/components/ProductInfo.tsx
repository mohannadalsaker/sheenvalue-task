import type { SingleProductData } from "../types";

const ProductInfo = ({ product }: { product: SingleProductData }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg">Product Information</h2>
      <div className="flex justify-between items-center">
        <h3 className="text-primary-text">Weight</h3>
        <p>{product.weight}g</p>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-primary-text">Stock</h3>
        <p>{product.stock} unit(s)</p>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-primary-text">Category</h3>
        <p>{product.category}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
