import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { step: step1, label: 'Sign In', to: '/login' },
    { step: step2, label: 'Shipping', to: '/shipping' },
    { step: step3, label: 'Payment', to: '/payment' },
    { step: step4, label: 'Place Order', to: '/placeorder' },
  ];

  return (
    <div className="flex justify-center mb-4 space-x-4">
      {steps.map((s, idx) =>
        s.step ? (
          <Link
            key={idx}
            to={s.to}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {s.label}
          </Link>
        ) : (
          <span
            key={idx}
            className="px-4 py-2 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            {s.label}
          </span>
        )
      )}
    </div>
  );
};

export default CheckoutSteps;
