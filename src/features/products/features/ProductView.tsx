import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProduct } from "../api/products/useGetSingleProduct";
import { Loader } from "@/shared/ui";
import {
  ImageViewer,
  ProductInfo,
  ProductPolicies,
  ProductReview,
  ProductSpecs,
  ProductViewSection,
} from "../components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { ArrowLeft } from "lucide-react";

const ProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProduct(+id!);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4 h-full">
      <PrimaryButton
        title="Back to products"
        icon={ArrowLeft}
        iconColor="black"
        className="bg-white text-secondary-bg bg-[url('')] w-fit border border-slate-200"
        onClick={() => {
          navigate("/products");
        }}
      />
      <div className="flex md:gap-8 gap-4 flex-wrap md:flex-nowrap">
        <div className="flex flex-col gap-4 md:w-[70%] w-full">
          <ProductViewSection>
            <ImageViewer images={data!.images} />
          </ProductViewSection>
          <ProductViewSection>
            <ProductSpecs product={data!} />
          </ProductViewSection>
          <ProductViewSection>
            <div className="flex flex-col gap-3">
              <h1 className="font-semibold text-xl">
                Customer Reviews{" "}
                <span className="text-primary">{data?.reviews.length}</span>
              </h1>
              {data?.reviews.map((rev, index) => (
                <>
                  <ProductReview
                    key={rev.reviewerEmail}
                    name={rev.reviewerName}
                    comment={rev.comment}
                    date={rev.date}
                    rating={rev.rating}
                  />
                  {index + 1 !== data.reviews.length && <hr />}
                </>
              ))}
            </div>
          </ProductViewSection>
        </div>
        <div className="flex flex-col gap-4 md:w-[30%] w-full">
          <ProductViewSection>
            <ProductInfo product={data!} />
          </ProductViewSection>
          <ProductViewSection>
            <ProductPolicies product={data!} />
          </ProductViewSection>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
