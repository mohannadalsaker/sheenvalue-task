import { Star } from "lucide-react";

const RatingStars = ({ rating }: { rating: number }) => {
  const roundedRating = Math.floor(rating);
  return (
    <div className="flex gap-1">
      {Array.from({ length: roundedRating }).map(() => (
        <Star size={15} fill="yellow" />
      ))}
      {Array.from({ length: 5 - roundedRating }).map(() => (
        <Star size={15} />
      ))}
    </div>
  );
};

export default RatingStars;
