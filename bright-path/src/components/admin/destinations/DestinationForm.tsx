import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { destinationSchema, DestinationFormValues } from "@/schemas";

interface DestinationFormProps {
    initialValues?: Partial<DestinationFormValues>;
    onSubmit: (data: DestinationFormValues) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
    submitLabel: string;
}

export default function DestinationForm({
    initialValues,
    onSubmit,
    onCancel,
    isSubmitting,
    submitLabel
}: DestinationFormProps) {
    const form = useForm<DestinationFormValues>({
        resolver: zodResolver(destinationSchema),
        defaultValues: {
            name: initialValues?.name || "",
            image: initialValues?.image || "",
            tagline: initialValues?.tagline || "",
            continent: initialValues?.continent || "",
            universities: initialValues?.universities || 0,
            averageTuition: initialValues?.averageTuition || "",
            programsCount: initialValues?.programsCount || 0,
            highlights: initialValues?.highlights
                ? Array.isArray(initialValues.highlights)
                    ? initialValues.highlights.join('\n')
                    : initialValues.highlights
                : "",
            featured: initialValues?.featured || false
        }
    });

    const handleFormSubmit = async (data: DestinationFormValues) => {
        await onSubmit(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. London, UK" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="continent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Continent</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a continent" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Africa">Africa</SelectItem>
                                        <SelectItem value="Asia">Asia</SelectItem>
                                        <SelectItem value="Europe">Europe</SelectItem>
                                        <SelectItem value="North America">North America</SelectItem>
                                        <SelectItem value="Oceania">Oceania</SelectItem>
                                        <SelectItem value="South America">South America</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a URL to an image representing this destination
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tagline</FormLabel>
                            <FormControl>
                                <Input placeholder="A short, catchy description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="universities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Universities</FormLabel>
                                <FormControl>
                                    <Input type="number" min="1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="programsCount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Programs</FormLabel>
                                <FormControl>
                                    <Input type="number" min="1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="averageTuition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Average Tuition</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. $10,000 - $30,000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="highlights"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Highlights</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter key highlights, one per line"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter each highlight on a new line
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Featured Destination</FormLabel>
                                <FormDescription>
                                    Featured destinations will be highlighted on the platform
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {submitLabel}
                    </Button>
                </div>
            </form>
        </Form>
    );
}