import { PlusCircle, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { DestinationFormValues } from "@/schemas";
import DestinationForm from "./DestinationForm";
import { Destination } from "@/types";

interface DestinationFormDialogProps {
    mode: "add" | "edit";
    destination?: Destination;
    isOpen: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    onSubmit: (data: DestinationFormValues) => Promise<void>;
}

export default function DestinationFormDialog({
    mode,
    destination,
    isOpen,
    isSubmitting,
    onClose,
    onSubmit
}: DestinationFormDialogProps) {
    const isEditMode = mode === "edit";

    if (isEditMode && !destination) return null;

    const initialValues = isEditMode && destination ? {
        name: destination.name,
        image: destination.image,
        tagline: destination.tagline,
        continent: destination.continent,
        universities: destination.universities,
        averageTuition: destination.averageTuition,
        programsCount: destination.programsCount,
        highlights: destination.highlights,
        featured: destination.featured
    } : undefined;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        {isEditMode ? (
                            <>
                                <Pencil className="mr-2 h-5 w-5 text-purple-500" />
                                Edit Destination
                            </>
                        ) : (
                            <>
                                <PlusCircle className="mr-2 h-5 w-5 text-purple-500" />
                                Add New Destination
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? `Update details for ${destination?.name}`
                            : "Add a new study abroad destination to the platform."
                        }
                    </DialogDescription>
                </DialogHeader>

                <DestinationForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    isSubmitting={isSubmitting}
                    submitLabel={isEditMode ? "Save Changes" : "Add Destination"}
                />
            </DialogContent>
        </Dialog>
    );
}