import { Box, Dot } from "lucide-react";
import type { SingleProductData } from "../types";
import RatingStars from "./RatingStars";
import StatusBadge from "./StatusBadge";

const ProductSpecs = ({ product }: { product: SingleProductData }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <StatusBadge status={product.availabilityStatus} />
        </div>
        <div className="flex gap-3">
          <span className="text-secondary-text">{product.brand}</span>
          <Dot />
          <span className="text-secondary-text">{product.category}</span>
          <Dot />
          <span className="text-secondary-text">SKU: {product.sku}</span>
        </div>
      </div>
      <h1 className="text-3xl text-primary font-bold">${product.price}</h1>
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center">
          <RatingStars rating={product.rating} />
          <p className="text-sm text-secondary-text">
            {product.rating} rating ({`${product.reviews.length}`} reviews)
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <Box size={15} color="gray" />
          <p className="text-sm text-secondary-text">
            {product.stock} in stock
          </p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-secondary-bg">Description</h3>
        <p className="text-secondary-text">{product.description || "------"}</p>
      </div>
    </div>
  );
};

export default ProductSpecs;
