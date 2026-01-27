export default function PaymentFailed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="bg-red-100 p-4 rounded-full mb-4">
        <svg
          className="w-12 h-12 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
      <p className="text-gray-600 mt-2">
        We couldn't process your transaction. Please check your card details or
        try another method.
      </p>
      <div className="flex gap-4 mt-6">
        <a
          href="/checkout"
          className="px-6 py-2 bg-gray-800 text-white rounded-lg"
        >
          Try Again
        </a>
        <a
          href="/support"
          className="px-6 py-2 border border-gray-300 rounded-lg"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
