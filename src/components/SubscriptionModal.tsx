"use client";

import { useState } from "react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: "monthly" | "annual";
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  planType,
}: SubscriptionModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const planDetails = {
    monthly: { name: "Pro Monthly", price: "$9/month" },
    annual: { name: "Pro Annual", price: "$84/year ($7/month)" },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setShowResult(false);

    try {
      // Check if user exists
      const response = await fetch(
        `/api/users?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (response.ok && data.user) {
        // User exists - show subscription info
        setUserInfo(data.user);
        setShowResult(true);
      } else {
        // User doesn't exist
        setError(
          "Account not found. Please login to the Recurio extension first to create your account."
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setUserInfo(null);
    setShowResult(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {!showResult ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Upgrade to {planDetails[planType].name}
              </h2>
              <p className="text-gray-600">
                Enter your email to continue with {planDetails[planType].price}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-500 text-gray-900 font-medium"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Continue"}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* User Subscription Info */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Found!
              </h2>
              {userInfo.name && (
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {userInfo.name}
                </p>
              )}
              <p className="text-gray-600 mb-6">{userInfo.email}</p>

              {/* Subscription Status */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Current Subscription
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-semibold ${
                        userInfo.subscriptionStatus === "ACTIVE"
                          ? "text-green-600"
                          : userInfo.subscriptionStatus === "FREE"
                          ? "text-gray-600"
                          : "text-orange-600"
                      }`}
                    >
                      {userInfo.subscriptionStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-semibold text-gray-900">
                      {userInfo.planType === "FREE"
                        ? "Free"
                        : userInfo.planType === "PRO_MONTHLY"
                        ? "Pro Monthly"
                        : "Pro Annual"}
                    </span>
                  </div>
                  {userInfo.subscriptionExpiry && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(
                          userInfo.subscriptionExpiry
                        ).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action based on current plan */}
              {userInfo.subscriptionStatus === "FREE" ? (
                <button
                  onClick={async () => {
                    // Redirect to Dodo Payments checkout
                    const productId =
                      planType === "monthly"
                        ? process.env.MONTHLY_PRODUCT_ID ||
                          "pdt_nqW9t1yY3VtRcOBXgQ8dZ"
                        : process.env.ANNUAL_PRODUCT_ID ||
                          "pdt_NbGeZRqoNYQZx0m81T6nd";
                    const response = await fetch(
                      `/api/checkout?productId=${productId}`
                    );
                    const data = await response.json();
                    if (data.checkout_url) {
                      window.location.href = data.checkout_url;
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Proceed to Payment
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    You already have an active subscription. Manage it from the
                    extension.
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
