import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    LogOut,
    FileText,
    Calendar,
    GraduationCap,
    BookOpen,
    Globe,
    Clock,
    CheckCircle,
    Bell
} from "lucide-react";
import { logoutUser } from "@/services/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { checkAdminRole } from "@/services/adminService";

export default function DashboardPage() {
    const { currentUser, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setLoading(false);
        }
    }

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

    const applications = [
        {
            id: "app1",
            university: "University of Oxford",
            program: "Computer Science",
            status: "In Progress",
            deadline: "Dec 15, 2023"
        },
        {
            id: "app2",
            university: "MIT",
            program: "Artificial Intelligence",
            status: "Submitted",
            deadline: "Nov 5, 2023"
        },
        {
            id: "app3",
            university: "University of Toronto",
            program: "Data Science",
            status: "Draft",
            deadline: "Jan 10, 2024"
        }
    ];

    const upcomingEvents = [
        {
            id: "event1",
            title: "MIT Virtual Info Session",
            date: "Nov 12, 2023",
            time: "3:00 PM - 4:30 PM"
        },
        {
            id: "event2",
            title: "IELTS Preparation Workshop",
            date: "Nov 15, 2023",
            time: "10:00 AM - 12:00 PM"
        }
    ];

    const recommendations = [
        {
            id: "rec1",
            university: "Stanford University",
            program: "Computer Science",
            match: "95% Match"
        },
        {
            id: "rec2",
            university: "University of Cambridge",
            program: "Artificial Intelligence",
            match: "92% Match"
        },
        {
            id: "rec3",
            university: "ETH Zurich",
            program: "Robotics",
            match: "88% Match"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16 pb-16">
            <div className="container mx-auto px-4">
                <div className="py-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Welcome, {currentUser?.displayName || 'Student'}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Your study abroad journey dashboard
                            </p>
                        </div>
                        <div className="flex mt-4 md:mt-0 space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-red-600 cursor-pointer border-red-200 hover:bg-red-50 hover:text-red-700"
                                onClick={handleLogout}
                                disabled={loading}
                            >
                                <LogOut size={16} />
                                <span className="hidden md:inline">Logout</span>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3 flex flex-row justify-between items-center">
                                    <CardTitle className="text-xl flex items-center">
                                        <FileText size={20} className="mr-2 text-purple-600" />
                                        Your Applications
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" className="text-purple-600">
                                        View All
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {applications.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No applications yet</p>
                                            <Button
                                                className="mt-4 bg-purple-600 hover:bg-purple-700"
                                                size="sm"
                                            >
                                                Start New Application
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {applications.map((app, index) => (
                                                <motion.div
                                                    key={app.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">{app.university}</h3>
                                                            <p className="text-sm text-gray-600">{app.program}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={`text-xs px-2 py-1 rounded-full ${app.status === 'Submitted'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : app.status === 'In Progress'
                                                                        ? 'bg-yellow-100 text-yellow-700'
                                                                        : 'bg-gray-100 text-gray-700'
                                                                    }`}
                                                            >
                                                                {app.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between mt-3">
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <Clock size={14} className="mr-1" />
                                                            Deadline: {app.deadline}
                                                        </div>
                                                        <Button variant="ghost" size="sm" className="text-xs text-purple-600 h-7 px-2">
                                                            Continue
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            <div className="text-center mt-2">
                                                <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                                                    Start New Application
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3 flex flex-row justify-between items-center">
                                    <CardTitle className="text-xl flex items-center">
                                        <Calendar size={20} className="mr-2 text-purple-600" />
                                        Upcoming Events
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" className="text-purple-600">
                                        View Calendar
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {upcomingEvents.length === 0 ? (
                                        <div className="text-center py-6">
                                            <p className="text-gray-500">No upcoming events</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {upcomingEvents.map((event, index) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="flex items-start p-3 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                                                >
                                                    <div className="bg-purple-100 rounded-lg p-2 mr-3 text-center w-12">
                                                        <div className="text-xs text-purple-600 font-semibold">
                                                            {event.date.split(", ")[0].split(" ")[0]}
                                                        </div>
                                                        <div className="text-lg font-bold text-purple-700">
                                                            {event.date.split(", ")[0].split(" ")[1]}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {event.date.split(", ")[1]}, {event.time}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl flex items-center">
                                        <CheckCircle size={20} className="mr-2 text-purple-600" />
                                        Your Study Abroad Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className="text-xs font-semibold inline-block text-purple-600">
                                                        Overall Progress: 42%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex h-2 mb-4 overflow-hidden text-xs bg-purple-100 rounded-full">
                                                <div style={{ width: "42%" }} className="flex flex-col justify-center text-center text-white whitespace-nowrap bg-gradient-to-r from-purple-500 to-indigo-600 shadow-none"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {[
                                                { title: "Profile Completion", status: "completed", progress: 100 },
                                                { title: "University Research", status: "in-progress", progress: 60 },
                                                { title: "Application Documents", status: "in-progress", progress: 30 },
                                                { title: "Test Preparation", status: "not-started", progress: 0 },
                                                { title: "Visa Application", status: "not-started", progress: 0 }
                                            ].map((step, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className={`h-7 w-7 rounded-full flex items-center justify-center mr-3 ${step.status === 'completed'
                                                        ? 'bg-green-100 text-green-600'
                                                        : step.status === 'in-progress'
                                                            ? 'bg-yellow-100 text-yellow-600'
                                                            : 'bg-gray-100 text-gray-400'
                                                        }`}>
                                                        {step.status === 'completed' ? (
                                                            <CheckCircle size={14} />
                                                        ) : (
                                                            <span className="text-xs font-semibold">{index + 1}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-sm font-medium text-gray-700">{step.title}</span>
                                                            <span className="text-xs text-gray-500">{step.progress}%</span>
                                                        </div>
                                                        <div className="h-1.5 bg-gray-100 rounded-full">
                                                            <div
                                                                className={`h-full rounded-full ${step.status === 'completed'
                                                                    ? 'bg-green-500'
                                                                    : step.status === 'in-progress'
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-gray-200'
                                                                    }`}
                                                                style={{ width: `${step.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="shadow-sm">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-1">
                                            <div className="bg-white rounded-full p-1">
                                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                                    <User size={30} />
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="mt-4 font-semibold text-lg">{currentUser?.displayName || 'Student'}</h3>
                                        <p className="text-sm text-gray-500">{currentUser?.email}</p>

                                        <div className="w-full mt-6 flex justify-center gap-2">
                                            {isAdmin ?
                                                (
                                                    <Button asChild variant="outline" size="sm" className="w-full">
                                                        <Link to={'/admin'}>
                                                            Visit Admin Dashboard
                                                        </Link>
                                                    </Button>
                                                ) : (
                                                    <>
                                                        <Button variant="outline" size="sm" className="">
                                                            Edit Profile
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="">
                                                            View Documents
                                                        </Button>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl flex items-center">
                                        <GraduationCap size={20} className="mr-2 text-purple-600" />
                                        Recommended for You
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {recommendations.map((rec, index) => (
                                            <motion.div
                                                key={rec.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="p-3 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{rec.university}</h3>
                                                        <p className="text-xs text-gray-600">{rec.program}</p>
                                                    </div>
                                                    <div className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full h-fit">
                                                        {rec.match}
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-right">
                                                    <Button variant="ghost" size="sm" className="text-xs text-purple-600 h-7 px-2">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3 flex flex-row justify-between items-center">
                                    <CardTitle className="text-xl flex items-center">
                                        <Bell size={20} className="mr-2 text-purple-600" />
                                        Notifications
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" className="text-xs text-purple-600 h-7 px-2">
                                        Mark All Read
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                id: "n1",
                                                message: "Application deadline for Oxford is in 2 weeks",
                                                time: "2 hours ago",
                                                unread: true
                                            },
                                            {
                                                id: "n2",
                                                message: "New scholarship opportunity available",
                                                time: "Yesterday",
                                                unread: true
                                            },
                                            {
                                                id: "n3",
                                                message: "Document verification completed",
                                                time: "3 days ago",
                                                unread: false
                                            }
                                        ].map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-3 text-sm rounded-lg ${notification.unread ? 'bg-purple-50' : 'bg-white border border-gray-100'}`}
                                            >
                                                <div className="flex justify-between">
                                                    <p className={notification.unread ? 'font-medium text-gray-900' : 'text-gray-700'}>
                                                        {notification.message}
                                                    </p>
                                                    {notification.unread && (
                                                        <div className="h-2 w-2 rounded-full bg-purple-600 flex-shrink-0 mt-1"></div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl flex items-center">
                                        <BookOpen size={20} className="mr-2 text-purple-600" />
                                        Resources
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { title: "Visa Guides", icon: <Globe size={16} />, color: "bg-blue-100 text-blue-600" },
                                            { title: "Scholarships", icon: <GraduationCap size={16} />, color: "bg-green-100 text-green-600" },
                                            { title: "Test Prep", icon: <FileText size={16} />, color: "bg-yellow-100 text-yellow-600" },
                                            { title: "Housing", icon: <BookOpen size={16} />, color: "bg-pink-100 text-pink-600" }
                                        ].map((resource, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                className="h-auto py-3 px-3 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50"
                                            >
                                                <div className={`w-8 h-8 rounded-full ${resource.color} flex items-center justify-center`}>
                                                    {resource.icon}
                                                </div>
                                                <span className="text-xs font-medium">{resource.title}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div >
    )
}