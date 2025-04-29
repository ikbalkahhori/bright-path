import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Menu,
    X,
    Bot,
    GraduationCap,
    Globe,
    Calendar,
    HelpCircle,
    Mail,
    LogIn,
    User,
    ChevronDown
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/services/firebase";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const { currentUser } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('#user-menu-button') && !target.closest('#user-menu')) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navigate = useNavigate();
    const [logoutLoading, setLogoutLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLogoutLoading(true);
            await logoutUser();
            setUserMenuOpen(false);
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setLogoutLoading(false);
        }
    };

    const isHomePage = location.pathname === '/';

    const navItems = [
        { name: "Home", path: "/", icon: <GraduationCap size={16} className="mr-1.5" /> },
        { name: "About", path: "/about", icon: <HelpCircle size={16} className="mr-1.5" /> },
        { name: "Services", path: "/services", icon: <Calendar size={16} className="mr-1.5" /> },
        { name: "Destinations", path: "/destinations", icon: <Globe size={16} className="mr-1.5" /> },
        { name: "AI Assistant", path: "/ai-assistant", icon: <Bot size={16} className="mr-1.5" /> },
        { name: "FAQ", path: "/faq", icon: <HelpCircle size={16} className="mr-1.5" /> },
        { name: "Contact", path: "/contact", icon: <Mail size={16} className="mr-1.5" /> },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage
                ? "bg-white/95 backdrop-blur-md shadow-md py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/"
                            className={`text-2xl font-bold ${isScrolled || !isHomePage ? "text-purple-700" : "text-white"
                                }`}
                        >
                            <span className={isScrolled || !isHomePage ? "text-purple-500" : "text-purple-300"}>
                                Bright
                            </span>
                            Path
                        </Link>
                    </motion.div>

                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link
                                    to={item.path}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${isScrolled || !isHomePage
                                        ? "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                                        : "text-gray-200 hover:text-white hover:bg-white/10"
                                        } ${location.pathname === item.path ? "bg-purple-50 text-purple-700" : ""}`}
                                >
                                    {item.icon && item.icon}
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}

                        <div className="ml-4 relative">
                            {currentUser ? (
                                <div>
                                    <button
                                        id="user-menu-button"
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${isScrolled || !isHomePage
                                            ? "text-gray-800 hover:bg-purple-50"
                                            : "text-white hover:bg-white/10"
                                            }`}
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    >
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isScrolled || !isHomePage
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-white/20 text-white"
                                            }`}>
                                            <User size={16} />
                                        </div>
                                        <span className="hidden sm:block">
                                            {currentUser.displayName?.split(' ')[0] || 'Account'}
                                        </span>
                                        <ChevronDown size={16} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {userMenuOpen && (
                                            <motion.div
                                                id="user-menu"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
                                            >
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {currentUser.displayName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {currentUser.email}
                                                    </p>
                                                </div>
                                                <div className="py-1">
                                                    <Link
                                                        to="/dashboard"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </div>
                                                <div className="py-1 border-t border-gray-100">
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                        onClick={handleLogout}
                                                        disabled={logoutLoading}
                                                    >
                                                        {logoutLoading ? "Signing Out..." : "Sign Out"}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Button
                                    className={
                                        isScrolled || !isHomePage
                                            ? "bg-purple-600 hover:bg-purple-700 rounded-lg"
                                            : "bg-white text-purple-700 hover:bg-white/90 rounded-lg"
                                    }
                                    asChild
                                >
                                    <Link to="/login">
                                        <LogIn size={16} className="mr-1.5" />
                                        Sign In
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </nav>

                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={isScrolled || !isHomePage ? "text-gray-900" : "text-white"}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t border-gray-200"
                    >
                        <div className="container mx-auto px-4 py-4">
                            {currentUser && (
                                <div className="flex items-center p-4 mb-4 bg-purple-50 rounded-lg">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mr-3">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{currentUser.displayName}</p>
                                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                                    </div>
                                </div>
                            )}

                            <nav className="flex flex-col space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 text-base font-medium flex items-center
                                        ${location.pathname === item.path ? "bg-purple-50 text-purple-700" : ""}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.icon && item.icon}
                                        {item.name}
                                    </Link>
                                ))}

                                {currentUser ? (
                                    <div className="space-y-2 pt-2 border-t border-gray-100 mt-2">
                                        <Link
                                            to="/dashboard"
                                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 text-base font-medium flex items-center"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <User size={16} className="mr-1.5" />
                                            Dashboard
                                        </Link>
                                        <button
                                            className="w-full mt-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 text-base font-medium flex items-center"
                                            onClick={handleLogout}
                                            disabled={logoutLoading}
                                        >
                                            <LogIn size={16} className="mr-1.5" />
                                            {logoutLoading ? "Signing Out..." : "Sign Out"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="pt-2 border-t border-gray-100 mt-2">
                                        <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                                            <Link
                                                to="/login"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <LogIn size={16} className="mr-1.5" />
                                                Sign In
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}