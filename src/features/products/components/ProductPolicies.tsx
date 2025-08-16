import { Shield } from "lucide-react";
import type { SingleProductData } from "../types";

const ProductPolicies = ({ product }: { product: SingleProductData }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3 items-center">
        <Shield size={25} />
        <h2 className="font-semibold text-lg">Product Policies</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-secondary-bg font-semibold">Warranty</h3>
          <p className="text-sm text-primary-text">
            {product.warrantyInformation}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-secondary-bg font-semibold">Shipping</h3>
          <p className="text-sm text-primary-text">
            {product.shippingInformation}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-secondary-bg font-semibold">Returns</h3>
          <p className="text-sm text-primary-text">{product.returnPolicy}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPolicies;
