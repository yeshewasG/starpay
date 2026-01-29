import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Enter Amount",
      description:
        "Specify the exact amount you wish to send in your local currency.",
      color: "bg-red-500",
    },
    {
      number: 2,
      title: "Choose Bank",
      description: "Choose the bank and enter the recipient's details.",
      color: "bg-green-500",
    },
    {
      number: 3,
      title: "Send Money",
      description:
        "Review the details, confirm, and send your money with confidence.",
      color: "bg-indigo-600",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        How Does It Work?
      </h2>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
        Our platform simplifies global money transfers in three easy steps,
        ensuring your funds reach their destination.
      </p>

      <div className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Decorative Dotted Line (Hidden on mobile) */}
        <div
          className="absolute top-8 left-0 w-full hidden md:block"
          aria-hidden="true"
        >
          <div className="border-t-2 border-dashed border-slate-200 w-[80%] mx-auto" />
        </div>

        {steps.map((step) => (
          <div
            key={step.number}
            className="relative flex flex-col items-center"
          >
            {/* Step Circle */}
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg ${step.color} z-10`}
            >
              {step.number}
            </div>

            {/* Content */}
            <h3 className="mt-6 text-xl font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-2 text-slate-500 max-w-xs leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
