<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Order;

class PaymentService
{
    /**
     * Process a payment for an order
     */
    public function processPayment($orderId, $amount, $method, $transactionId = null)
    {
        $order = Order::findOrFail($orderId);

        // Create payment record
        $payment = Payment::create([
            'order_id' => $orderId,
            'amount' => $amount,
            'method' => $method,
            'status' => 'completed',
            'transaction_id' => $transactionId,
        ]);

        // Update order status to paid
        $order->update(['status' => 'paid']);

        return $payment;
    }

    /**
     * Get payment for an order
     */
    public function getPayment($orderId)
    {
        return Payment::where('order_id', $orderId)->first();
    }

    /**
     * Update payment status
     */
    public function updatePaymentStatus($paymentId, $status)
    {
        $payment = Payment::findOrFail($paymentId);
        $payment->update(['status' => $status]);
        return $payment;
    }
}
