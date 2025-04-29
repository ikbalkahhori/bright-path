import { motion } from "framer-motion";
import {
    Pencil,
    Trash2,
    Star,
    School,
    BookOpen,
    DollarSign
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Destination } from "@/types";

interface DestinationCardProps {
    destination: Destination;
    onEdit: (destination: Destination) => void;
    onDelete: (destination: Destination) => void;
    onToggleFeatured: (destination: Destination) => void;
}

export default function DestinationCard({
    destination,
    onEdit,
    onDelete,
    onToggleFeatured
}: DestinationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-40 bg-gray-100">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                        {destination.featured && (
                            <Badge className="bg-amber-500 hover:bg-amber-600">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                            </Badge>
                        )}
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                            {destination.continent}
                        </Badge>
                    </div>
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{destination.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                        {destination.tagline}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center">
                            <School className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{destination.universities} universities</span>
                        </div>
                        <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{destination.programsCount} programs</span>
                        </div>
                        <div className="flex items-center col-span-2">
                            <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{destination.averageTuition}</span>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Highlights:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            {destination.highlights.slice(0, 2).map((highlight, index) => (
                                <li key={index} className="line-clamp-1">{highlight}</li>
                            ))}
                            {destination.highlights.length > 2 && (
                                <li className="text-purple-600">
                                    +{destination.highlights.length - 2} more highlights
                                </li>
                            )}
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center">
                        <span className="text-sm mr-2">Featured:</span>
                        <Switch
                            checked={destination.featured}
                            onCheckedChange={() => onToggleFeatured(destination)}
                            className="data-[state=checked]:bg-purple-600 cursor-pointer"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(destination)}
                            className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(destination)}
                            className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}