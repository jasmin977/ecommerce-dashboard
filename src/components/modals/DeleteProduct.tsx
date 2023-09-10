"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
interface props {
  deleteFunc: () => void;
  icon?: JSX.Element;
}

function DeleteDialog({ deleteFunc, icon }: props) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false); // Initially set open to false
  const [loading, setLoading] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);

      await deleteFunc();
      router.refresh();
    } catch (error: any) {
      console.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false); // Close the dialog after delete operation
    }
  };

  const openDialog = () => {
    setOpen(!open); // Open the dialog when needed
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-8 h-8 p-0"
          onClick={openDialog}
        >
          {icon ? icon : <Trash className="w-4 h-4" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-heading3-bold">
            Are You Sure!{" "}
          </DialogTitle>
          <DialogDescription>Want to delete this product?</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            loading={loading}
            onClick={openDialog}
            type="submit"
            variant={"outline"}
          >
            cancel
          </Button>
          <Button
            loading={loading}
            onClick={onDelete}
            type="submit"
            variant={"destructive"}
          >
            Yes delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteDialog;
