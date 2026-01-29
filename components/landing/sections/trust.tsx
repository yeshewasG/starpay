import React from "react";
import {
  Play,
  Globe,
  Bell,
  Zap,
  Monitor,
  Lock,
  Headphones,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Global Transfers",
      description:
        "Send money to family, pay international bills, and support loved ones abroad.",
      icon: <Globe className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: "Instant Notifications",
      description:
        "Stay informed with real-time updates on your transactions, from initiation to delivery.",
      icon: <Bell className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: "Lowest Fees",
      description:
        "Enjoy competitive exchange rates and minimal transaction fees.",
      icon: <Zap className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: "Worldwide Access",
      description: "Reach recipients in over 150 countries effortlessly.",
      icon: <Monitor className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: "Secure Transfers",
      description:
        "Advanced encryption and fraud protection for peace of mind.",
      icon: <Lock className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: "24/7 Support",
      description: "Always-on customer support whenever you need help.",
      icon: <Headphones className="h-6 w-6 text-emerald-400" />,
    },
  ];

  return (
    <section className="relative bg-[#1a233a] pt-48 pb-24 overflow-visible">
      {/* 🌊 Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-[120px] fill-white"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86
          82.39-16.72,168.19-17.73,250.45-.39
          C823.78,31,906.67,72,985.66,92.83
          c70.05,18.48,146.53,26.09,214.34,3V0H0V120z"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* 🎥 Floating Video / Image */}
        <div className="relative -mt-60 mb-24 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="/images/background.png"
            alt="Video Thumbnail"
            className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white shadow-xl hover:scale-110 transition">
              <Play className="h-8 w-8 text-red-500 fill-red-500 ml-1" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-16">
          Send money across borders with ease.
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
