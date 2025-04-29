import * as z from "zod";

export const destinationSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    image: z.string().url({ message: "Please enter a valid image URL" }),
    tagline: z.string().min(10, { message: "Tagline must be at least 10 characters" }),
    continent: z.string().min(2, { message: "Please select a continent" }),
    universities: z.coerce.number().min(1, { message: "Must have at least 1 university" }),
    averageTuition: z.string().min(5, { message: "Please provide average tuition" }),
    programsCount: z.coerce.number().min(1, { message: "Must have at least 1 program" }),
    highlights: z.string().min(5, { message: "Please provide highlights" }),
    featured: z.boolean().default(false)
});

export type DestinationFormValues = z.infer<typeof destinationSchema>;