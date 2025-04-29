import {
    doc,
    setDoc,
    getDoc
} from "firebase/firestore";
import { db, registerUser } from "./firebase";

export const setupDefaultAdmin = async () => {
    try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";

        const usersRef = doc(db, "users", "admin");
        const userSnap = await getDoc(usersRef);

        if (!userSnap.exists()) {
            const userCredential = await registerUser(adminEmail, adminPassword, "Admin User");

            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: adminEmail,
                displayName: "Admin User",
                role: "admin",
                createdAt: new Date()
            });

            console.log("Default admin user created successfully");
            return true;
        } else {
            console.log("Admin user already exists");
            return true;
        }
    } catch (error) {
        console.error("Error setting up default admin:", error);
        return false;
    }
}