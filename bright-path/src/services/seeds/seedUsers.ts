import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase";

const defaultUsers = [
    {
        displayName: "Emma Thompson",
        email: "emma.t@example.com",
        role: "user",
        createdAt: Timestamp.fromDate(new Date(2025, 2, 15)), // March 15, 2025
        interests: ["Computer Science", "Engineering", "Data Science"],
        preferredDestination: "United Kingdom",
        applicationCount: 3
    },
    {
        displayName: "Michael Chen",
        email: "mchen@example.com",
        role: "user",
        createdAt: Timestamp.fromDate(new Date(2025, 3, 2)), // April 2, 2025
        interests: ["Business Administration", "Marketing", "Finance"],
        preferredDestination: "Canada",
        applicationCount: 2
    },
    {
        displayName: "Sofia Rodriguez",
        email: "sofia.r@example.com",
        role: "user",
        createdAt: Timestamp.fromDate(new Date(2025, 3, 10)), // April 10, 2025
        interests: ["Biology", "Medicine", "Research"],
        preferredDestination: "Australia",
        applicationCount: 1
    },
    {
        displayName: "Jamal Williams",
        email: "jwilliams@example.com",
        role: "user",
        createdAt: Timestamp.fromDate(new Date(2025, 3, 18)), // April 18, 2025
        interests: ["Engineering", "Mechanical Engineering", "Physics"],
        preferredDestination: "Germany",
        applicationCount: 0
    },
    {
        displayName: "Aisha Patel",
        email: "a.patel@example.com",
        role: "user",
        createdAt: Timestamp.fromDate(new Date(2025, 3, 20)), // April 20, 2025
        interests: ["Business Analytics", "Data Science", "Finance"],
        preferredDestination: "Singapore",
        applicationCount: 0
    },
    {
        displayName: "Admin User",
        email: "admin@brightpath.com",
        role: "admin",
        createdAt: Timestamp.fromDate(new Date(2025, 1, 1)), // Feb 1, 2025
        lastLogin: Timestamp.fromDate(new Date())
    }
];

export const seedUsers = async () => {
    try {
        const usersRef = collection(db, "users");
        const existingUsers = await getDocs(usersRef);

        if (!existingUsers.empty) {
            console.log("Users already exist in the database. Skipping seeding.");
            return { success: true, message: "Users already exist." };
        }

        const addPromises = defaultUsers.map(user =>
            addDoc(collection(db, "users"), user)
        );

        await Promise.all(addPromises);

        console.log("Successfully seeded users!");
        return { success: true, message: "Default users have been added." };
    } catch (error) {
        console.error("Error seeding users:", error);
        return { success: false, message: "Failed to seed users.", error };
    }
}

export const checkAndSeedUsers = async () => {
    try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        if (snapshot.empty) {
            console.log("No users found, seeding the database...");
            return await seedUsers();
        } else {
            console.log(`Found ${snapshot.size} users, no need to seed.`);
            return { success: true, message: "Users already exist." };
        }
    } catch (error) {
        console.error("Error checking users:", error);
        return { success: false, message: "Failed to check users.", error };
    }
}