import { ArrowDownRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
    rating?: number;
  };
  className?: string;
}

const HeroSection = ({
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Sign Up",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Get Started",
      url: "https://www.shadcnblocks.com",
    },
  },
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
  className,
}: Hero3Props) => {
  return (
    <section
      className={cn("relative w-full min-h-screen overflow-hidden", className)}
    >
      {/* FULL-PAGE BACKGROUND */}
      <div className="absolute inset-0 w-full h-full">
        {/* Background Image */}
        <div
          className="w-full h-full bg-cover bg-center filter blur-xs"
          style={{ backgroundImage: "url('/images/coffee.webp')" }}
        />

        {/* GRADIENT OVERLAYS */}
        {/* 1. Darken overlay for text readability (Optional) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* 2. THE FADE AWAY: Bottom to Top */}
        {/* Change 'from-background' to 'from-white' if you aren't using shadcn variables */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto grid min-h-screen items-center gap-10 lg:grid-cols-2 lg:gap-20 px-4">
        {/* LEFT CONTENT */}
        <div className="mx-auto flex flex-col items-center text-center text-white lg:items-start lg:text-left lg:max-w-3xl">
          <h1 className="my-6 text-4xl font-bold lg:text-6xl xl:text-7xl tracking-tight">
            {heading}
          </h1>
          <p className="mb-8 max-w-xl text-white/90 lg:text-xl">
            {description}
          </p>

          {/* REVIEWS */}
          <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {reviews?.avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  className="size-12 border-2 border-background"
                >
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </span>

            <div className="text-white">
              <div className="flex items-center gap-1 justify-center lg:justify-start">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-1 font-semibold">
                  {reviews?.rating?.toFixed(1)}
                </span>
              </div>
              <p className="text-white/80">from {reviews?.count}+ reviews</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            {buttons?.primary && (
              <Button asChild size="lg" className="w-full sm:w-auto px-8">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons?.secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white/40 hover:bg-white/10 w-full sm:w-auto"
              >
                <a
                  href={buttons.secondary.url}
                  className="flex items-center gap-2"
                >
                  {buttons.secondary.text}
                  <ArrowDownRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* RIGHT IMAGE/MOCKUP */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder hero"
            className="max-h-[500px] w-full rounded-2xl border border-white/10 shadow-2xl object-cover lg:max-h-[700px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
