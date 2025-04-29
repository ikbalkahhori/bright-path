import { useState, useEffect } from "react";
import {
    Users,
    Search,
    Loader2,
    Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchUsers, getUserStats } from "@/services/userService";
import { User } from "@/types";
import { toast } from "sonner";
import UsersStats from "@/components/admin/users/UserStats";
import UsersTable from "@/components/admin/users/UsersTable";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [stats, setStats] = useState({
        totalUsers: 0,
        newUsersThisMonth: 0,
        adminCount: 0
    });

    const loadUsers = async () => {
        setLoading(true);
        try {
            const userData = await fetchUsers();
            setUsers(userData);
            setFilteredUsers(userData);

            const statsData = await getUserStats();
            setStats(statsData);
        } catch (error) {
            console.error("Error loading users:", error);
            toast.error('Failed to load users. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredUsers(users);
            return;
        }

        const lowercaseQuery = searchQuery.toLowerCase();
        const filtered = users.filter(user =>
            user.displayName.toLowerCase().includes(lowercaseQuery) ||
            user.email.toLowerCase().includes(lowercaseQuery) ||
            (user.preferredDestination && user.preferredDestination.toLowerCase().includes(lowercaseQuery))
        );

        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const exportToCSV = () => {
        if (users.length === 0) return;

        const headers = ["Name", "Email", "Role", "Joined Date", "Preferred Destination"];
        const csvData = users.map(user => [
            user.displayName,
            user.email,
            user.role,
            new Date(user.createdAt).toLocaleDateString(),
            user.preferredDestination || "Not specified"
        ]);

        csvData.unshift(headers);

        const csvContent = csvData.map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "users.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast(`Exported ${users.length} users to CSV.`);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Users className="mr-2 h-6 w-6 text-blue-500" />
                        Platform Users
                    </h1>
                    <p className="text-gray-600 mt-1">
                        View and manage student accounts on the platform
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search users..."
                            className="pl-10 w-full md:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={exportToCSV}
                        variant="outline"
                        className="border-blue-200 text-blue-700"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <UsersStats
                totalUsers={stats.totalUsers}
                newUsersThisMonth={stats.newUsersThisMonth}
                adminCount={stats.adminCount}
            />

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading users...</span>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6">
                    <Users className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-500 text-center mb-4">
                        {searchQuery
                            ? `No users match your search for "${searchQuery}"`
                            : "There are no users registered in the system yet"}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Showing {filteredUsers.length} of {users.length} users
                        </div>
                        {searchQuery && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchQuery("")}
                                className="text-gray-500"
                            >
                                Clear search
                            </Button>
                        )}
                    </div>
                    <UsersTable users={filteredUsers} />
                </div>
            )}
        </div>
    );
}