export interface Destination {
    id: string;
    name: string;
    image: string;
    tagline: string;
    continent: string;
    universities: number;
    averageTuition: string;
    programsCount: number;
    highlights: string[];
    featured: boolean;
}

export interface User {
    id: string;
    email: string;
    displayName: string;
    role: string;
    createdAt: Date;
    photoURL?: string;
    lastLogin?: Date;
    interests?: string[];
    preferredDestination?: string;
    applicationCount?: number;
}