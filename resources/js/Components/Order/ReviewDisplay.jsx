import { Star, User } from 'lucide-react';

export default function ReviewDisplay({ review }) {
    if (!review) {
        return null;
    }

    return (
        <div className="bg-gray-900/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <User size={20} className="text-blue-400" />
                        Your Review
                    </h3>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={20}
                            className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                        />
                    ))}
                </div>
            </div>

            {review.comment && (
                <p className="text-gray-300 mb-4 whitespace-pre-wrap">{review.comment}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                    Submitted on {new Date(review.created_at).toLocaleDateString()}
                </span>
                {review.updated_at !== review.created_at && (
                    <span>
                        Updated on {new Date(review.updated_at).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
}
