import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "./firebase";

export const checkAdminRole = async (userId: string): Promise<boolean> => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return false;
        }

        const userData = userSnap.data();
        return userData.role === "admin";
    } catch (error) {
        console.error("Error checking admin role:", error);
        return false;
    }
}

export const fetchDashboardStats = async () => {
    try {
        return {
            totalStudents: 1842,
            totalDestinations: 47,
            totalApplications: 876,
            totalUniversities: 312,
            studentGrowth: 14.5,
            applicationGrowth: 8.2
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
}

export const fetchRecentUsers = async (limitCount = 5) => {
    try {
        // For now, return mock data
        return [
            {
                id: "user1",
                name: "Emma Thompson",
                email: "emma.t@example.com",
                signupDate: new Date(2025, 3, 22), // April 22, 2025
                destination: "United Kingdom"
            },
            {
                id: "user2",
                name: "Michael Chen",
                email: "mchen@example.com",
                signupDate: new Date(2025, 3, 21), // April 21, 2025
                destination: "Canada"
            },
            {
                id: "user3",
                name: "Sofia Rodriguez",
                email: "sofia.r@example.com",
                signupDate: new Date(2025, 3, 19), // April 19, 2025
                destination: "Australia"
            },
            {
                id: "user4",
                name: "Jamal Williams",
                email: "jwilliams@example.com",
                signupDate: new Date(2025, 3, 18), // April 18, 2025
                destination: "Germany"
            },
            {
                id: "user5",
                name: "Aisha Patel",
                email: "a.patel@example.com",
                signupDate: new Date(2025, 3, 17), // April 17, 2025
                destination: "Singapore"
            }
        ];
    } catch (error) {
        console.error("Error fetching recent users:", error);
        throw error;
    }
}

export const fetchRecentDestinations = async (limitCount = 5) => {
    try {
        // For now, return mock data
        return [
            {
                id: "dest1",
                name: "London, UK",
                continent: "Europe",
                addedDate: new Date(2025, 3, 20), // April 20, 2025
                universities: 15,
                popularity: 98
            },
            {
                id: "dest2",
                name: "Toronto, Canada",
                continent: "North America",
                addedDate: new Date(2025, 3, 19), // April 19, 2025
                universities: 12,
                popularity: 92
            },
            {
                id: "dest3",
                name: "Sydney, Australia",
                continent: "Oceania",
                addedDate: new Date(2025, 3, 18), // April 18, 2025
                universities: 9,
                popularity: 88
            },
            {
                id: "dest4",
                name: "Berlin, Germany",
                continent: "Europe",
                addedDate: new Date(2025, 3, 17), // April 17, 2025
                universities: 11,
                popularity: 85
            },
            {
                id: "dest5",
                name: "Singapore",
                continent: "Asia",
                addedDate: new Date(2025, 3, 16), // April 16, 2025
                universities: 6,
                popularity: 90
            }
        ];
    } catch (error) {
        console.error("Error fetching recent destinations:", error);
        throw error;
    }
};

// Fetch recent applications
export const fetchRecentApplications = async (limitCount = 5) => {
    try {
        // Mock data for applications
        return [
            {
                id: "app1",
                studentName: "Olivia Johnson",
                university: "University of Oxford",
                program: "MSc in International Business",
                status: "Pending",
                submittedDate: new Date(2025, 3, 22) // April 22, 2025
            },
            {
                id: "app2",
                studentName: "Daniel Kim",
                university: "University of Toronto",
                program: "Computer Science",
                status: "Approved",
                submittedDate: new Date(2025, 3, 21) // April 21, 2025
            },
            {
                id: "app3",
                studentName: "Maria Garcia",
                university: "Melbourne University",
                program: "Environmental Science",
                status: "Pending",
                submittedDate: new Date(2025, 3, 20) // April 20, 2025
            },
            {
                id: "app4",
                studentName: "Ahmed Hassan",
                university: "Technical University of Berlin",
                program: "Mechanical Engineering",
                status: "Interview",
                submittedDate: new Date(2025, 3, 19) // April 19, 2025
            },
            {
                id: "app5",
                studentName: "Priya Sharma",
                university: "National University of Singapore",
                program: "Business Analytics",
                status: "Approved",
                submittedDate: new Date(2025, 3, 18) // April 18, 2025
            }
        ];
    } catch (error) {
        console.error("Error fetching recent applications:", error);
        throw error;
    }
}