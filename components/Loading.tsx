import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-15 animate-spin", className)}
      {...props}
    />
  );
}
export function SpinnerCustom() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
