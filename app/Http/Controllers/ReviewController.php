<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Order $order)
    {
        // Authorize the user can only review their own orders
        $this->authorize('update', $order);

        // Validate the request
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        // Check if review already exists
        $existingReview = $order->review;
        if ($existingReview) {
            // Update existing review
            $existingReview->update($validated);
            return back()->with('success', 'Review updated successfully');
        }

        // Create new review
        $order->review()->create([
            'user_id' => auth()->id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return back()->with('success', 'Review submitted successfully');
    }

    public function destroy(Review $review)
    {
        // Authorize the user can only delete their own reviews
        $this->authorize('delete', $review);

        $order = $review->order;
        $review->delete();

        return back()->with('success', 'Review deleted successfully');
    }
}

