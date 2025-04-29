import { useState, useEffect } from "react";
import {
    PlusCircle,
    Globe,
    Search,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Destination } from "@/types";
import { DestinationFormValues } from "@/schemas";
import {
    fetchDestinations,
    addDestination,
    updateDestination,
    deleteDestination,
    toggleDestinationFeatured
} from "@/services/destinationService";
import { toast } from 'sonner';
import DestinationCard from "@/components/admin/destinations/DestinationCard";
import DestinationTable from "@/components/admin/destinations/DestinationTable";
import DestinationFormDialog from "@/components/admin/destinations/DestinationFormDialog";
import DeleteConfirmationDialog from "@/components/admin/destinations/DeleteConfirmationDialog";

export default function AdminDestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadDestinations = async () => {
        setLoading(true);
        try {
            const data = await fetchDestinations();
            setDestinations(data);
        } catch (error) {
            console.error("Error loading destinations:", error);
            toast.success('Failed to load destinations. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDestinations();
    }, []);

    const handleAddDestination = async (data: DestinationFormValues) => {
        setIsSubmitting(true);
        try {
            const highlightsArray = data.highlights.split('\n').map(item => item.trim()).filter(item => item.length > 0);

            const destinationData = {
                ...data,
                highlights: highlightsArray
            }

            await addDestination(destinationData);

            toast.success(`Destination "${data.name}" has been added.`);

            setIsAddDialogOpen(false);
            loadDestinations();
        } catch (error) {
            console.error("Error adding destination:", error);
            toast.error('Failed to add destination. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleUpdateDestination = async (data: DestinationFormValues) => {
        if (!currentDestination) return;

        setIsSubmitting(true);
        try {
            const highlightsArray = data.highlights.split('\n').map(item => item.trim()).filter(item => item.length > 0);

            const destinationData = {
                ...data,
                highlights: highlightsArray
            }

            await updateDestination(currentDestination.id, destinationData);

            toast.success(`Destination "${data.name}" has been updated.`);

            setIsEditDialogOpen(false);
            setCurrentDestination(null);
            loadDestinations();
        } catch (error) {
            console.error("Error updating destination:", error);
            toast.error("Failed to update destination. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteDestination = async () => {
        if (!currentDestination) return;

        setIsSubmitting(true);
        try {
            await deleteDestination(currentDestination.id);

            toast.success(`Destination "${currentDestination.name}" has been deleted.`);

            setIsDeleteDialogOpen(false);
            setCurrentDestination(null);
            loadDestinations();
        } catch (error) {
            console.error("Error deleting destination:", error);
            toast.error('Failed to delete destination. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleToggleFeatured = async (destination: Destination) => {
        try {
            await toggleDestinationFeatured(destination.id, !destination.featured);

            setDestinations(prev =>
                prev.map(d =>
                    d.id === destination.id
                        ? { ...d, featured: !d.featured }
                        : d
                )
            );

            toast.success(`"${destination.name}" ${!destination.featured ? 'is now featured' : 'is no longer featured'}.`);
        } catch (error) {
            console.error("Error toggling featured status:", error);
            toast.error('Failed to update featured status. Please try again.');
        }
    }

    const openEditDialog = (destination: Destination) => {
        setCurrentDestination(destination);
        setIsEditDialogOpen(true);
    }

    const openDeleteDialog = (destination: Destination) => {
        setCurrentDestination(destination);
        setIsDeleteDialogOpen(true);
    }

    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.continent.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Globe className="mr-2 h-6 w-6 text-purple-500" />
                        Study Destinations
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage all study abroad destinations available to students
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search destinations..."
                            className="pl-10 w-full md:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Destination
                    </Button>
                    <div className="flex border rounded-md">
                        <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="sm"
                            className="rounded-r-none"
                            onClick={() => setViewMode("grid")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid-2x2"><path d="M10 3H3v7h7V3z" /><path d="M21 3h-7v7h7V3z" /><path d="M21 14h-7v7h7v-7z" /><path d="M10 14H3v7h7v-7z" /></svg>
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "secondary" : "ghost"}
                            size="sm"
                            className="rounded-l-none"
                            onClick={() => setViewMode("list")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                        </Button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                    <span className="ml-2 text-gray-600">Loading destinations...</span>
                </div>
            ) : filteredDestinations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6">
                    <Globe className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No destinations found</h3>
                    <p className="text-gray-500 text-center mb-4">
                        {searchQuery
                            ? `No destinations match your search for "${searchQuery}"`
                            : "You haven't added any study destinations yet"}
                    </p>
                    <Button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Your First Destination
                    </Button>
                </div>
            ) : (
                <>
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDestinations.map((destination) => (
                                <DestinationCard
                                    key={destination.id}
                                    destination={destination}
                                    onEdit={openEditDialog}
                                    onDelete={openDeleteDialog}
                                    onToggleFeatured={handleToggleFeatured}
                                />
                            ))}
                        </div>
                    ) : (
                        <DestinationTable
                            destinations={filteredDestinations}
                            onEdit={openEditDialog}
                            onDelete={openDeleteDialog}
                            onToggleFeatured={handleToggleFeatured}
                        />
                    )}
                </>
            )}

            <DestinationFormDialog
                mode={isEditDialogOpen ? "edit" : "add"}
                destination={currentDestination || undefined}
                isOpen={isAddDialogOpen || isEditDialogOpen}
                isSubmitting={isSubmitting}
                onClose={() => {
                    setIsAddDialogOpen(false);
                    setIsEditDialogOpen(false);
                    setCurrentDestination(null);
                }}
                onSubmit={isEditDialogOpen ? handleUpdateDestination : handleAddDestination}
            />

            <DeleteConfirmationDialog
                destination={currentDestination}
                isOpen={isDeleteDialogOpen}
                isDeleting={isSubmitting}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteDestination}
            />
        </div>
    );
}