import React from "react";

const AppDownloadSection = () => {
  return (
    // Changed min-h-[90vh] to min-h-fit to ensure it only takes necessary space
    <section className="relative overflow-hidden  px-6 md:px-12 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row items-center">
      {/* LEFT CONTENT */}
      <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8 z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Download our app and <br className="hidden sm:block" />
          send money back home <span className="text-blue-200">seamlessly</span>
        </h2>

        <p className="text-lg sm:text-xl text-blue-100 font-light max-w-lg mx-auto lg:mx-0">
          Instant transfers to Ethiopia • Best real-time rates • Secure & easy
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-6 pt-4 lg:pt-6">
          <a
            href="#"
            className="transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <img
              src="/icons/appstore.png"
              alt="App Store"
              className="h-14 sm:h-16 w-auto"
            />
          </a>
          <a
            href="#"
            className="transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <img
              src="/icons/playstore.png"
              alt="Play Store"
              className="h-14 sm:h-16 w-auto"
            />
          </a>
        </div>
      </div>

      {/* RIGHT IMAGE - Now hidden on mobile/tablet, visible on large screens */}
      <div className="hidden lg:block flex-1 relative w-full h-[500px] xl:h-[600px]">
        {/* Glow effect */}

        {/* Clipped image */}
        <div
          className="
            absolute inset-0
            bg-[url('/images/phone_image.png')]
            bg-no-repeat
            bg-contain
            bg-right
            clip-app-shape
          "
        />
      </div>
    </section>
  );
};

export default AppDownloadSection;
