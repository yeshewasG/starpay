// components/landing/sections/features.tsx
"use client";
import { ShieldCheck, Globe, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Transfer Network",
    description:
      "Enjoy secure and fast global transfers with our intuitive platform.",
  },
  {
    icon: RefreshCcw,
    title: "Up-to-date Exchange Rates",
    description: "Send money safely and quickly with real-time exchange rates.",
  },
  {
    icon: Globe,
    title: "Worldwide Access",
    description: "Reach recipients across borders without complexity.",
  },
];

export default function Features() {
  return (
    <section className={cn("py-24 md:py-32")}>
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex"
        >
          <img
            src="/images/users.png"
            alt="placeholder hero"
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left gap-4"
        >
          <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl">
            Fast global money transfers.
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            We offer reliable solutions to improve your global transfer
            experience.
          </p>
          {features.map((f, index) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <f.icon className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-medium">{f.title}</p>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
