import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Globe,
    Users,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/services/firebase";
import { checkAdminRole } from "@/services/adminService";

export default function AdminLayout() {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const verifyAdmin = async () => {
            if (!currentUser) {
                navigate("/login");
                return;
            }

            try {
                const isUserAdmin = await checkAdminRole(currentUser.uid);
                if (!isUserAdmin) {
                    navigate("/dashboard");
                    return;
                }
                setIsAdmin(true);
            } catch (error) {
                console.error("Error checking admin role:", error);
                navigate("/dashboard");
            } finally {
                setLoading(false);
            }
        };

        verifyAdmin();
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const navigationItems = [
        { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
        { name: "Destinations", path: "/admin/destinations", icon: <Globe size={20} /> },
        { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    ];

    const isActivePath = (path: string) => {
        if (path === "/admin" && location.pathname === "/admin") {
            return true;
        }
        return location.pathname.startsWith(path) && path !== "/admin";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="lg:hidden bg-white shadow-sm fixed top-0 inset-x-0 z-50 h-16 px-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-700 p-2 rounded-md hover:bg-gray-100"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link to="/admin" className="text-xl font-bold text-purple-700">
                        Admin <span className="text-purple-500">Panel</span>
                    </Link>
                </div>
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-700"
                    >
                        <Bell size={20} />
                    </Button>
                    <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
                        <AvatarFallback className="bg-purple-200 text-purple-700">
                            {currentUser?.displayName?.[0] || "U"}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="relative flex-1 flex flex-col max-w-xs w-full pt-16 pb-4 bg-white"
                    >
                        <div className="px-4 py-4 space-y-4">
                            <div className="flex flex-col items-center space-y-2 border-b border-gray-200 pb-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
                                    <AvatarFallback className="bg-purple-200 text-purple-700 text-xl">
                                        {currentUser?.displayName?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-center">
                                    <p className="font-medium text-gray-800">{currentUser?.displayName}</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                            </div>
                            <nav className="flex flex-col space-y-1">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`px-4 py-3 rounded-md flex items-center ${isActivePath(item.path)
                                            ? "bg-purple-100 text-purple-700 font-medium"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-auto pt-4 border-t border-gray-200">
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-3 rounded-md flex items-center text-red-600 hover:bg-red-50 w-full"
                                >
                                    <LogOut size={20} className="mr-3" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="flex h-screen overflow-hidden">
                <div className={`bg-white fixed inset-y-0 z-30 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} border-r border-gray-200 hidden lg:block`}>
                    <div className="h-full flex flex-col">
                        <div className={`flex items-center h-16 ${sidebarOpen ? "px-6" : "justify-center"} border-b border-gray-200`}>
                            {sidebarOpen ? (
                                <Link to="/admin" className="text-xl font-bold text-purple-700">
                                    Admin <span className="text-purple-500">Panel</span>
                                </Link>
                            ) : (
                                <Link to="/admin" className="text-xl font-bold text-purple-700">
                                    AP
                                </Link>
                            )}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className={`h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all ${sidebarOpen ? "ml-auto" : "hidden"}`}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="flex-1 py-6 overflow-y-auto">
                            <nav className="px-3 space-y-1">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`flex items-center ${sidebarOpen ? "px-3 py-2" : "px-2 py-3 justify-center"
                                            } rounded-md ${isActivePath(item.path)
                                                ? "bg-purple-100 text-purple-700 font-medium"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        <span className={sidebarOpen ? "mr-3" : ""}>{item.icon}</span>
                                        {sidebarOpen && <span>{item.name}</span>}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="border-t border-gray-200 p-4">
                            <div className={`flex ${sidebarOpen ? "items-center" : "flex-col items-center"} space-x-3`}>
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                    <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
                                    <AvatarFallback className="bg-purple-200 text-purple-700">
                                        {currentUser?.displayName?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                {sidebarOpen && (
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {currentUser?.displayName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            Administrator
                                        </p>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleLogout}
                                className={`mt-4 ${sidebarOpen
                                    ? "flex items-center w-full px-3 py-2"
                                    : "flex items-center justify-center w-full py-2"
                                    } text-sm text-red-600 hover:bg-red-50 rounded-md`}
                            >
                                <LogOut size={18} className={sidebarOpen ? "mr-2" : ""} />
                                {sidebarOpen && <span>Logout</span>}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"} mt-16 lg:mt-0`}
                >
                    <div className="bg-white shadow-sm h-16 fixed top-0 right-0 z-20 w-full hidden lg:flex items-center px-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 mr-4 transition-all"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="ml-auto flex items-center space-x-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-700 relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                            </Button>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={currentUser?.photoURL || ""} alt={currentUser?.displayName || "User"} />
                                <AvatarFallback className="bg-purple-200 text-purple-700">
                                    {currentUser?.displayName?.[0] || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <main className="p-6 pt-6 lg:pt-20">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}