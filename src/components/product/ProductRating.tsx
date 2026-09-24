import { Star, StarHalf } from 'lucide-react';

interface ProductRatingProps {
  readonly rating: number;
  readonly reviews?: number;
  readonly className?: string;
}

export default function ProductRating({ rating, reviews, className = '' }: ProductRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center" aria-label={`Rating: ${rating} out of 5`}>
          {Array.from({ length: 5 }, (_, starIndex) => (
            <span key={`star-${starIndex}`} className="text-accent">
              {starIndex < fullStars ? (
                <Star size={14} fill="currentColor" aria-hidden="true" />
              ) : starIndex === fullStars && hasHalf ? (
                <StarHalf size={14} fill="currentColor" aria-hidden="true" />
              ) : (
                <Star size={14} className="text-gray-300" aria-hidden="true" />
              )}
          </span>
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-xs text-muted">({reviews})</span>
      )}
    </div>
  );
}
