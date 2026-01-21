import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModalProps } from "@/lib/types";

export default function ComingSoonModal({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <DialogContent
         className="sm:max-w-md flex flex-col items-center p-6"
        aria-description="ComingSoonModal"
      >
        <div className="relative w-48 h-48 mt-4">
          <Image
            src="/images/coming-soon.png"
            alt="Gift Ethiopia Logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Coming Soon</DialogTitle>
        </DialogHeader>

        <p className="text-gray-700 mt-4 text-center">
          This feature is not available yet. We’re working hard to bring it to
          you soon stay tuned for updates!
        </p>

        <DialogFooter className="w-full mt-4">
          <Button
            variant="default"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
