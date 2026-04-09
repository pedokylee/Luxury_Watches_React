import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Star, Send, Trash2 } from 'lucide-react';

export default function ReviewForm({ order, existingReview, onSubmitSuccess }) {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState(existingReview?.comment || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        setIsSubmitting(true);

        try {
            router.post(`/orders/${order.id}/reviews`, {
                rating,
                comment: comment || null,
            }, {
                onSuccess: () => {
                    onSubmitSuccess?.();
                    if (!existingReview) {
                        setRating(0);
                        setComment('');
                    }
                },
                onError: (errors) => {
                    console.error('Error submitting review:', errors);
                    alert('Failed to submit review. Please try again.');
                },
                onFinish: () => setIsSubmitting(false),
            });
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        setIsDeleting(true);

        try {
            router.delete(`/reviews/${existingReview.id}`, {
                onSuccess: () => {
                    onSubmitSuccess?.();
                    setRating(0);
                    setComment('');
                },
                onError: (errors) => {
                    console.error('Error deleting review:', errors);
                    alert('Failed to delete review. Please try again.');
                },
                onFinish: () => setIsDeleting(false),
            });
        } catch (error) {
            console.error('Error:', error);
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-gray-900/30 border border-gray-700/50 backdrop-blur-xl rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
                {existingReview ? 'Update Your Review' : 'Share Your Experience'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                        Rating
                    </label>
                    <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none transition-transform hover:scale-110"
                            >
                                <Star
                                    size={32}
                                    className={`transition-colors ${
                                        star <= (hoverRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-600'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    {rating > 0 && (
                        <p className="text-sm text-gray-400 mt-2">
                            {rating === 1 && 'Poor'}
                            {rating === 2 && 'Fair'}
                            {rating === 3 && 'Good'}
                            {rating === 4 && 'Very Good'}
                            {rating === 5 && 'Excellent'}
                        </p>
                    )}
                </div>

                {/* Comment */}
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                        Comments (Optional)
                    </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about your experience with this order..."
                        maxLength={1000}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {comment.length}/1000
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting || rating === 0}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                    >
                        <Send size={18} />
                        {existingReview ? 'Update Review' : 'Submit Review'}
                    </button>

                    {existingReview && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 disabled:bg-gray-600/20 disabled:cursor-not-allowed text-red-400 border border-red-600/30 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={18} />
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
