import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

const defaultDestinations = [
    {
        name: "London, United Kingdom",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
        tagline: "Historic academic excellence in a global city",
        continent: "Europe",
        universities: 40,
        averageTuition: "$20,000 - $50,000",
        programsCount: 1200,
        highlights: [
            "Home to prestigious institutions like Oxford and Cambridge",
            "Multicultural environment with students from all over the world",
            "Strong industry connections and internship opportunities",
            "Rich cultural heritage and vibrant city life"
        ],
        featured: true
    },
    {
        name: "Tokyo, Japan",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2088&auto=format&fit=crop",
        tagline: "Cutting-edge technology meets traditional culture",
        continent: "Asia",
        universities: 35,
        averageTuition: "¥535,800 - ¥3,500,000",
        programsCount: 950,
        highlights: [
            "World-leading technology and engineering programs",
            "Unique blend of traditional values and futuristic innovation",
            "Safe environment with excellent public transportation",
            "Scholarships available for international students"
        ],
        featured: false
    },
    {
        name: "Sydney, Australia",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
        tagline: "Quality education in a stunning natural setting",
        continent: "Oceania",
        universities: 25,
        averageTuition: "AUD 20,000 - AUD 45,000",
        programsCount: 870,
        highlights: [
            "High-ranking universities with practical learning approaches",
            "Work opportunities during and after studies",
            "Excellent quality of life and outdoor activities",
            "Diverse and inclusive student communities"
        ],
        featured: true
    },
    {
        name: "Toronto, Canada",
        image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=2070&auto=format&fit=crop",
        tagline: "Diverse, inclusive education with pathway to immigration",
        continent: "North America",
        universities: 22,
        averageTuition: "CAD 20,000 - CAD 40,000",
        programsCount: 760,
        highlights: [
            "Multicultural environment reflecting Canada's diversity",
            "Post-graduation work permits and immigration pathways",
            "Safe, clean city with excellent public services",
            "Strong focus on research and innovation"
        ],
        featured: true
    },
    {
        name: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2070&auto=format&fit=crop",
        tagline: "Asia's education hub with global connections",
        continent: "Asia",
        universities: 34,
        averageTuition: "SGD 20,000 - SGD 45,000",
        programsCount: 950,
        highlights: [
            "World-class universities with global reputation",
            "Strategic location as a business hub in Asia",
            "Multi-cultural environment with English as main language",
            "Strong government support for research and innovation"
        ],
        featured: false
    }
];

export const seedDestinations = async () => {
    try {
        const destinationsRef = collection(db, "destinations");
        const existingDestinations = await getDocs(destinationsRef);

        if (!existingDestinations.empty) {
            console.log("Destinations already exist in the database. Skipping seeding.");
            return { success: true, message: "Destinations already exist." };
        }

        const addPromises = defaultDestinations.map(destination =>
            addDoc(collection(db, "destinations"), destination)
        );

        await Promise.all(addPromises);

        console.log("Successfully seeded destinations!");
        return { success: true, message: "Default destinations have been added." };
    } catch (error) {
        console.error("Error seeding destinations:", error);
        return { success: false, message: "Failed to seed destinations.", error };
    }
}

export const checkAndSeedDestinations = async () => {
    try {
        const destinationsRef = collection(db, "destinations");
        const snapshot = await getDocs(destinationsRef);

        if (snapshot.empty) {
            console.log("No destinations found, seeding the database...");
            return await seedDestinations();
        } else {
            console.log(`Found ${snapshot.size} destinations, no need to seed.`);
            return { success: true, message: "Destinations already exist." };
        }
    } catch (error) {
        console.error("Error checking destinations:", error);
        return { success: false, message: "Failed to check destinations.", error };
    }
}