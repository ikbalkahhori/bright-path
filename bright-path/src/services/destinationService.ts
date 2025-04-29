import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";
import { db } from "./firebase";
import { Destination } from "@/types";

export const fetchDestinations = async (): Promise<Destination[]> => {
    try {
        const destinationsRef = collection(db, "destinations");
        const q = query(destinationsRef, orderBy("name"));
        const querySnapshot = await getDocs(q);

        const destinationsList: Destination[] = [];
        querySnapshot.forEach((doc) => {
            destinationsList.push({ id: doc.id, ...doc.data() } as Destination);
        });

        return destinationsList;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        throw error;
    }
}

export const addDestination = async (destinationData: Omit<Destination, "id">): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, "destinations"), destinationData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding destination:", error);
        throw error;
    }
}

export const updateDestination = async (id: string, destinationData: Partial<Omit<Destination, "id">>): Promise<void> => {
    try {
        const destinationRef = doc(db, "destinations", id);
        await updateDoc(destinationRef, destinationData);
    } catch (error) {
        console.error("Error updating destination:", error);
        throw error;
    }
}

export const deleteDestination = async (id: string): Promise<void> => {
    try {
        const destinationRef = doc(db, "destinations", id);
        await deleteDoc(destinationRef);
    } catch (error) {
        console.error("Error deleting destination:", error);
        throw error;
    }
}

export const toggleDestinationFeatured = async (id: string, featured: boolean): Promise<void> => {
    try {
        const destinationRef = doc(db, "destinations", id);
        await updateDoc(destinationRef, { featured });
    } catch (error) {
        console.error("Error toggling featured status:", error);
        throw error;
    }
}