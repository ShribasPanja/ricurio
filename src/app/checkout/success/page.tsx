import Image from "next/image";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for upgrading to Recurio Pro! Your subscription is now
          active and you have access to all premium features.
        </p>

        {/* Features List */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What's included:
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Unlimited profile imports</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Multiple custom sheets</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Export to CSV/JSON/TXT</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Priority support</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <a
            href="chrome-extension://your-extension-id/sidepanel.html"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
          >
            Open Extension
          </a>
          <Link
            href="/"
            className="block w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-gray-400 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-6">
          Need help? Contact us at{" "}
          <a
            href="mailto:shribaspanja@gmail.com"
            className="text-blue-600 hover:underline"
          >
            shribaspanja@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
