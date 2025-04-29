import {
    Pencil,
    Trash2
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Destination } from "@/types";

interface DestinationTableProps {
    destinations: Destination[];
    onEdit: (destination: Destination) => void;
    onDelete: (destination: Destination) => void;
    onToggleFeatured: (destination: Destination) => void;
}

export default function DestinationTable({
    destinations,
    onEdit,
    onDelete,
    onToggleFeatured
}: DestinationTableProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">Destination</TableHead>
                        <TableHead>Continent</TableHead>
                        <TableHead>Universities</TableHead>
                        <TableHead>Programs</TableHead>
                        <TableHead>Tuition Range</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {destinations.map((destination) => (
                        <TableRow key={destination.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage src={destination.image} alt={destination.name} />
                                        <AvatarFallback className="bg-purple-100 text-purple-700">
                                            {destination.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>{destination.name}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                            {destination.tagline}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {destination.continent}
                                </Badge>
                            </TableCell>
                            <TableCell>{destination.universities}</TableCell>
                            <TableCell>{destination.programsCount}</TableCell>
                            <TableCell>{destination.averageTuition}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={destination.featured}
                                    onCheckedChange={() => onToggleFeatured(destination)}
                                    className="data-[state=checked]:bg-purple-600"
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(destination)}
                                        className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(destination)}
                                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}