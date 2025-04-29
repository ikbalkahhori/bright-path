import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { checkAdminRole } from "@/services/adminService";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { currentUser, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            try {
                const isUserAdmin = await checkAdminRole(currentUser.uid);
                setIsAdmin(isUserAdmin);
            } catch (error) {
                console.error("Error checking admin role:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            verifyAdmin();
        }
    }, [currentUser, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}