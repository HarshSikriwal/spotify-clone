import React from "react";
import { IoMdClose } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogPortal>
        <DialogOverlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <DialogContent
          className="fixed drop-shadow-md border border-neutral-700 top-[50%] 
        left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] 
        translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none"
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-bold mb-4">
              {title}
            </DialogTitle>
            <DialogDescription className="mb-5 text-sm leading-normal text-center">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Modal;
