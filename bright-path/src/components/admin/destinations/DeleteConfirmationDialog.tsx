import { Trash2, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Destination } from "@/types";

interface DeleteConfirmationDialogProps {
    destination: Destination | null;
    isOpen: boolean;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function DeleteConfirmationDialog({
    destination,
    isOpen,
    isDeleting,
    onClose,
    onConfirm
}: DeleteConfirmationDialogProps) {
    if (!destination) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-red-600 flex items-center">
                        <Trash2 className="mr-2 h-5 w-5" />
                        Delete Destination
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete "{destination.name}"? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-gray-500">
                        Deleting this destination will remove it from all listings and student recommendations.
                    </p>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isDeleting}
                    >
                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}