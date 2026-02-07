"use client";
import { motion } from "framer-motion";
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
    <section className="relative   pt-48 pb-24 overflow-visible">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Trusted by Millions Worldwide
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            We've been helping people send money globally since 2015. Our
            platform is designed with security, convenience, and reliability in
            mind.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-emerald-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-col items-center"
        >
          <div className="flex items-center bg-emerald-500/20 rounded-full px-6 py-3">
            <Play className="h-5 w-5 text-emerald-400 mr-2" />
            <span className="text-white font-medium">Watch How It Works</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
