import RatingStars from "./RatingStars";
import dayjs from "dayjs";

interface ProductReviewProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductReview = ({ comment, date, name, rating }: ProductReviewProps) => {
  return (
    <div className="flex gap-3 p-3">
      <div className="rounded-full bg-primary h-12 w-12 flex justify-center items-center">
        <p className="text-white font-semibold">
          {name.split(" ").map((word) => word[0].toUpperCase())}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-secondary-text text-sm flex gap-2 items-center">
            <RatingStars rating={rating} /> {dayjs(date).format("MMM DD YYYY")}
          </p>
        </div>
        <p className="text-secondary-text"> {comment}</p>
      </div>
    </div>
  );
};

export default ProductReview;
