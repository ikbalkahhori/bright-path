import {
    collection,
    getDocs,
    query,
    orderBy,
    where,
    limit,
    Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { User } from "@/types";

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            // Convert Firestore timestamp to Date
            const createdAt = userData.createdAt ? userData.createdAt.toDate() : new Date();
            const lastLogin = userData.lastLogin ? userData.lastLogin.toDate() : null;

            usersList.push({
                id: doc.id,
                ...userData,
                createdAt,
                lastLogin
            } as User);
        });

        return usersList;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const fetchRecentUsers = async (limitCount = 5): Promise<User[]> => {
    try {
        const usersRef = collection(db, "users");
        const q = query(
            usersRef,
            orderBy("createdAt", "desc"),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        const usersList: User[] = [];

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            // Convert Firestore timestamp to Date
            const createdAt = userData.createdAt ? userData.createdAt.toDate() : new Date();
            const lastLogin = userData.lastLogin ? userData.lastLogin.toDate() : null;

            usersList.push({
                id: doc.id,
                ...userData,
                createdAt,
                lastLogin
            } as User);
        });

        return usersList;
    } catch (error) {
        console.error("Error fetching recent users:", error);
        throw error;
    }
}

export const getUserStats = async () => {
    try {
        const usersRef = collection(db, "users");
        const allUsersSnapshot = await getDocs(usersRef);

        const totalUsers = allUsersSnapshot.size;

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentUsersQuery = query(
            usersRef,
            where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo))
        );
        const recentUsersSnapshot = await getDocs(recentUsersQuery);
        const newUsersThisMonth = recentUsersSnapshot.size;

        const adminQuery = query(usersRef, where("role", "==", "admin"));
        const adminSnapshot = await getDocs(adminQuery);
        const adminCount = adminSnapshot.size;

        return {
            totalUsers,
            newUsersThisMonth,
            adminCount
        };
    } catch (error) {
        console.error("Error getting user stats:", error);
        throw error;
    }
}