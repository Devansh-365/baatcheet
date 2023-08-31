"use client";

import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";

export const DeleteServerModal = () => {
  const { type, isOpen, onClose, data } = useModal();

  const router = useRouter();

  const { server } = data;

  const isModalOpen = isOpen && type === "deleteServer";

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      toast.success("Server has been deleted!");
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden max-w-[375px]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl font-bold">Delete Server</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Are you sure you want to do this? <br />
            <span className="text-indigo-500 font-semibold">
              #{server?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <Button disabled={isLoading} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            variant="primary"
            className="bg-[#ED4245] hover:bg-[#ED4245]/90"
            disabled={isLoading}
            onClick={onClick}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
