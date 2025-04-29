import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
    Users,
    Globe,
    School,
    GraduationCap,
    FileText,
    TrendingUp,
    ArrowRight,
    ChevronUp,
    ChevronDown,
    Clock,
    CheckCircle,
    AlertCircle,
    BarChart,
    Briefcase
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
    fetchDashboardStats,
    fetchRecentUsers,
    fetchRecentDestinations,
    fetchRecentApplications
} from "@/services/adminService";
import { formatDate, getTimeGreeting } from "@/lib/utils";

interface DashboardStats {
    totalStudents: number;
    totalDestinations: number;
    totalApplications: number;
    totalUniversities: number;
    studentGrowth: number;
    applicationGrowth: number;
}

interface RecentUser {
    id: string;
    name: string;
    email: string;
    signupDate: Date;
    destination: string;
    avatar?: string;
}

interface RecentDestination {
    id: string;
    name: string;
    continent: string;
    addedDate: Date;
    universities: number;
    popularity: number;
}

interface RecentApplication {
    id: string;
    studentName: string;
    university: string;
    program: string;
    status: string;
    submittedDate: Date;
}

export default function AdminHomePage() {
    const { currentUser } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [recentDestinations, setRecentDestinations] = useState<RecentDestination[]>([]);
    const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const statsData = await fetchDashboardStats();
                const usersData = await fetchRecentUsers(5);
                const destinationsData = await fetchRecentDestinations(5);
                const applicationsData = await fetchRecentApplications(5);

                setStats(statsData);
                setRecentUsers(usersData);
                setRecentDestinations(destinationsData);
                setRecentApplications(applicationsData);
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-bold text-gray-900">
                        {getTimeGreeting()}, {currentUser?.displayName?.split(' ')[0] || 'Admin'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Welcome to BrightPath study abroad admin dashboard
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 md:mt-0 flex items-center space-x-3"
                >
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <BarChart className="h-4 w-4 mr-2" />
                        Reports
                    </Button>
                </motion.div>
            </div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Students */}
                    <Card className="border-t-4 border-blue-500">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-sm font-medium text-gray-500 flex items-center">
                                <Users className="h-4 w-4 text-blue-500 mr-2" />
                                Total Students
                            </CardDescription>
                            <CardTitle className="text-2xl font-bold">{stats?.totalStudents.toLocaleString()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center pt-1 text-xs">
                                <span className={`inline-flex items-center ${stats?.studentGrowth && stats.studentGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {stats?.studentGrowth && stats.studentGrowth >= 0 ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                                    {Math.abs(stats?.studentGrowth || 0)}%
                                </span>
                                <span className="text-gray-500 ml-2">from last month</span>
                            </div>
                            <Link to="/admin/users" className="text-blue-600 text-xs font-medium mt-4 inline-flex items-center hover:underline">
                                View all students
                                <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Total Destinations */}
                    <Card className="border-t-4 border-purple-500">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-sm font-medium text-gray-500 flex items-center">
                                <Globe className="h-4 w-4 text-purple-500 mr-2" />
                                Study Destinations
                            </CardDescription>
                            <CardTitle className="text-2xl font-bold">{stats?.totalDestinations.toLocaleString()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center pt-1 text-xs">
                                <span className="text-green-600 inline-flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Active
                                </span>
                                <span className="text-gray-500 ml-2">across 5 continents</span>
                            </div>
                            <Link to="/admin/destinations" className="text-purple-600 text-xs font-medium mt-4 inline-flex items-center hover:underline">
                                Manage destinations
                                <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Total Applications */}
                    <Card className="border-t-4 border-pink-500">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-sm font-medium text-gray-500 flex items-center">
                                <FileText className="h-4 w-4 text-pink-500 mr-2" />
                                Active Applications
                            </CardDescription>
                            <CardTitle className="text-2xl font-bold">{stats?.totalApplications.toLocaleString()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center pt-1 text-xs">
                                <span className={`inline-flex items-center ${stats?.applicationGrowth && stats.applicationGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {stats?.applicationGrowth && stats.applicationGrowth >= 0 ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                                    {Math.abs(stats?.applicationGrowth || 0)}%
                                </span>
                                <span className="text-gray-500 ml-2">from last month</span>
                            </div>
                            <div className="text-pink-600 text-xs font-medium mt-4 inline-flex items-center hover:underline cursor-pointer">
                                View applications
                                <ArrowRight className="h-3 w-3 ml-1" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Universities */}
                    <Card className="border-t-4 border-amber-500">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-sm font-medium text-gray-500 flex items-center">
                                <School className="h-4 w-4 text-amber-500 mr-2" />
                                Partner Universities
                            </CardDescription>
                            <CardTitle className="text-2xl font-bold">{stats?.totalUniversities.toLocaleString()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center pt-1 text-xs">
                                <span className="text-green-600 inline-flex items-center">
                                    <ChevronUp className="h-3 w-3 mr-1" />
                                    5
                                </span>
                                <span className="text-gray-500 ml-2">new this month</span>
                            </div>
                            <div className="text-amber-600 text-xs font-medium mt-4 inline-flex items-center hover:underline cursor-pointer">
                                View universities
                                <ArrowRight className="h-3 w-3 ml-1" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Main Dashboard Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="applications">Applications</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Destination Analytics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium flex items-center">
                                        <Globe className="h-5 w-5 mr-2 text-purple-500" />
                                        Popular Destinations
                                    </CardTitle>
                                    <CardDescription>
                                        Top 5 study destinations by student interest
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-5">
                                        {recentDestinations.map((destination) => (
                                            <div key={destination.id}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-medium">{destination.name}</span>
                                                        <span className="text-xs text-gray-500 ml-2">({destination.continent})</span>
                                                    </div>
                                                    <span className="text-xs font-medium">{destination.popularity}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                                        style={{ width: `${destination.popularity}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <span className="text-xs text-gray-500">{destination.universities} universities</span>
                                                    <span className="text-xs text-gray-500">Added {formatDate(destination.addedDate)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 text-center">
                                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                                            <Link to="/admin/destinations" className="flex items-center">
                                                View All Destinations
                                                <ArrowRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Study Programs */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium flex items-center">
                                        <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                                        Top Study Programs
                                    </CardTitle>
                                    <CardDescription>
                                        Most requested programs by student applications
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-5">
                                        {/* Program 1 */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">Computer Science</span>
                                                </div>
                                                <span className="text-xs font-medium">189 students</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                            </div>
                                        </div>

                                        {/* Program 2 */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">Business Administration</span>
                                                </div>
                                                <span className="text-xs font-medium">174 students</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                        </div>

                                        {/* Program 3 */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">Engineering</span>
                                                </div>
                                                <span className="text-xs font-medium">152 students</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                                            </div>
                                        </div>

                                        {/* Program 4 */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">Medicine</span>
                                                </div>
                                                <span className="text-xs font-medium">127 students</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                                            </div>
                                        </div>

                                        {/* Program 5 */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">Data Science</span>
                                                </div>
                                                <span className="text-xs font-medium">118 students</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '59%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                                            <div className="flex items-center">
                                                View All Programs
                                                <ArrowRight className="h-4 w-4 ml-1" />
                                            </div>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Application Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-medium flex items-center">
                                    <FileText className="h-5 w-5 mr-2 text-pink-500" />
                                    Application Status by Country
                                </CardTitle>
                                <CardDescription>
                                    Overview of current application processing status
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-left border-b border-gray-200">
                                                <th className="pb-3 font-medium text-gray-500 w-1/4">Destination</th>
                                                <th className="pb-3 font-medium text-gray-500">Total</th>
                                                <th className="pb-3 font-medium text-gray-500">
                                                    <span className="inline-flex items-center text-yellow-500">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        Pending
                                                    </span>
                                                </th>
                                                <th className="pb-3 font-medium text-gray-500">
                                                    <span className="inline-flex items-center text-blue-500">
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                        In Review
                                                    </span>
                                                </th>
                                                <th className="pb-3 font-medium text-gray-500">
                                                    <span className="inline-flex items-center text-green-500">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Approved
                                                    </span>
                                                </th>
                                                <th className="pb-3 font-medium text-gray-500 w-1/5">Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr>
                                                <td className="py-3 font-medium">United Kingdom</td>
                                                <td className="py-3">245</td>
                                                <td className="py-3 text-yellow-600">58</td>
                                                <td className="py-3 text-blue-600">42</td>
                                                <td className="py-3 text-green-600">145</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                                            <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600 whitespace-nowrap">60%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 font-medium">Canada</td>
                                                <td className="py-3">192</td>
                                                <td className="py-3 text-yellow-600">32</td>
                                                <td className="py-3 text-blue-600">28</td>
                                                <td className="py-3 text-green-600">132</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                                            <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600 whitespace-nowrap">68%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 font-medium">Australia</td>
                                                <td className="py-3">176</td>
                                                <td className="py-3 text-yellow-600">24</td>
                                                <td className="py-3 text-blue-600">36</td>
                                                <td className="py-3 text-green-600">116</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                                            <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600 whitespace-nowrap">66%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 font-medium">Germany</td>
                                                <td className="py-3">142</td>
                                                <td className="py-3 text-yellow-600">18</td>
                                                <td className="py-3 text-blue-600">32</td>
                                                <td className="py-3 text-green-600">92</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                                            <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600 whitespace-nowrap">65%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 font-medium">Singapore</td>
                                                <td className="py-3">121</td>
                                                <td className="py-3 text-yellow-600">15</td>
                                                <td className="py-3 text-blue-600">22</td>
                                                <td className="py-3 text-green-600">84</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                                            <div className="bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600 whitespace-nowrap">70%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 text-center">
                                    <Button variant="outline" size="sm" className="text-pink-600 border-pink-200">
                                        <div className="flex items-center">
                                            View Detailed Report
                                            <ArrowRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Education Counselors */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-medium flex items-center">
                                    <Briefcase className="h-5 w-5 mr-2 text-amber-500" />
                                    Education Counselor Performance
                                </CardTitle>
                                <CardDescription>
                                    Student success rates by education counselor
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-left border-b border-gray-200">
                                                <th className="pb-3 font-medium text-gray-500">Counselor</th>
                                                <th className="pb-3 font-medium text-gray-500">Students</th>
                                                <th className="pb-3 font-medium text-gray-500">Applications</th>
                                                <th className="pb-3 font-medium text-gray-500">Success Rate</th>
                                                <th className="pb-3 font-medium text-gray-500">Reviews</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr>
                                                <td className="py-3">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-purple-100 text-purple-700">JD</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">Jessica Davis</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">42</td>
                                                <td className="py-3">38</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <span className="text-green-600 font-medium mr-1">94%</span>
                                                        <ChevronUp className="h-4 w-4 text-green-600" />
                                                    </div>
                                                </td>
                                                <td className="py-3">4.9/5</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-blue-100 text-blue-700">RK</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">Robert Kim</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">38</td>
                                                <td className="py-3">35</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <span className="text-green-600 font-medium mr-1">91%</span>
                                                        <ChevronUp className="h-4 w-4 text-green-600" />
                                                    </div>
                                                </td>
                                                <td className="py-3">4.8/5</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-green-100 text-green-700">AP</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">Amara Patel</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">45</td>
                                                <td className="py-3">40</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <span className="text-green-600 font-medium mr-1">89%</span>
                                                        <ChevronUp className="h-4 w-4 text-green-600" />
                                                    </div>
                                                </td>
                                                <td className="py-3">4.7/5</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-yellow-100 text-yellow-700">TM</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">Thomas Miller</span>
                                                    </div>
                                                </td>
                                                <td className="py-3">36</td>
                                                <td className="py-3">31</td>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <span className="text-green-600 font-medium mr-1">85%</span>
                                                        <ChevronUp className="h-4 w-4 text-green-600" />
                                                    </div>
                                                </td>
                                                <td className="py-3">4.6/5</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Students Tab */}
                    <TabsContent value="students" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-medium flex items-center">
                                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                                    Recent Students
                                </CardTitle>
                                <CardDescription>
                                    New students who recently signed up
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {recentUsers.map((user) => (
                                        <div key={user.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                                            <Avatar className="h-12 w-12">
                                                {user.avatar ? (
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                ) : (
                                                    <AvatarFallback className="bg-blue-100 text-blue-700">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.email}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                                        {user.destination}
                                                    </span>
                                                    <span className="text-xs text-gray-500 ml-2 flex items-center">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        Joined {formatDate(user.signupDate)}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                View Profile
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <Link to="/admin/users">
                                        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                                            View All Students
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-medium flex items-center">
                                    <Globe className="h-5 w-5 mr-2 text-purple-500" />
                                    Student Geographic Distribution
                                </CardTitle>
                                <CardDescription>
                                    Student home countries and destination preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-sm font-medium mb-3">Top Source Countries</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">India</span>
                                                        <span className="text-xs font-medium">26%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '26%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">China</span>
                                                        <span className="text-xs font-medium">22%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">Nigeria</span>
                                                        <span className="text-xs font-medium">14%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '14%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">Brazil</span>
                                                        <span className="text-xs font-medium">9%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">Vietnam</span>
                                                        <span className="text-xs font-medium">7%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium mb-3">Age Distribution</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">18-22 years</span>
                                                        <span className="text-xs font-medium">45%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">23-26 years</span>
                                                        <span className="text-xs font-medium">32%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">27-30 years</span>
                                                        <span className="text-xs font-medium">15%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm">31+ years</span>
                                                        <span className="text-xs font-medium">8%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Applications Tab */}
                    <TabsContent value="applications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-medium flex items-center">
                                    <FileText className="h-5 w-5 mr-2 text-pink-500" />
                                    Recent Applications
                                </CardTitle>
                                <CardDescription>
                                    Latest student applications requiring attention
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentApplications.map((application) => (
                                        <div key={application.id} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-white">
                                                        {application.status === "Approved" ? (
                                                            <div className="bg-green-500 h-full w-full rounded-full flex items-center justify-center">
                                                                <CheckCircle size={20} />
                                                            </div>
                                                        ) : application.status === "Pending" ? (
                                                            <div className="bg-yellow-500 h-full w-full rounded-full flex items-center justify-center">
                                                                <Clock size={20} />
                                                            </div>
                                                        ) : (
                                                            <div className="bg-blue-500 h-full w-full rounded-full flex items-center justify-center">
                                                                <AlertCircle size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-medium">{application.studentName}</h3>
                                                        <p className="text-xs text-gray-500">{application.university}</p>
                                                    </div>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${application.status === "Approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : application.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-blue-100 text-blue-800"
                                                    }`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                            <div className="mt-3 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-500 text-xs">Program: <span className="font-medium text-gray-700">{application.program}</span></span>
                                                    <span className="text-xs text-gray-500">Submitted: {formatDate(application.submittedDate)}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <Button variant="outline" size="sm">View Details</Button>
                                                {application.status === "Pending" && (
                                                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">Review Now</Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <Button variant="default" className="bg-pink-600 hover:bg-pink-700">
                                        View All Applications
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium flex items-center">
                                        <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                                        Application Conversion Rates
                                    </CardTitle>
                                    <CardDescription>
                                        Percentage of applicants who accept and enroll
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <div className="text-sm font-medium">Overall Conversion</div>
                                            <div className="text-sm font-medium text-green-600">78%</div>
                                        </div>
                                        <Progress value={78} className="h-2 bg-gray-100" />
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <h3 className="text-sm font-medium mb-3">By Destination</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <div className="text-sm">United Kingdom</div>
                                                    <div className="text-xs font-medium">82%</div>
                                                </div>
                                                <Progress value={82} className="h-2 bg-gray-100" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <div className="text-sm">Canada</div>
                                                    <div className="text-xs font-medium">79%</div>
                                                </div>
                                                <Progress value={79} className="h-2 bg-gray-100" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <div className="text-sm">Australia</div>
                                                    <div className="text-xs font-medium">76%</div>
                                                </div>
                                                <Progress value={76} className="h-2 bg-gray-100" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <div className="text-sm">Germany</div>
                                                    <div className="text-xs font-medium">74%</div>
                                                </div>
                                                <Progress value={74} className="h-2 bg-gray-100" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg font-medium flex items-center">
                                        <School className="h-5 w-5 mr-2 text-amber-500" />
                                        Top Universities
                                    </CardTitle>
                                    <CardDescription>
                                        Most popular universities among our students
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                            <div className="h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center text-amber-700">
                                                <School size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">University of Oxford</p>
                                                <p className="text-xs text-gray-500">United Kingdom • 87 applications</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                            <div className="h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center text-amber-700">
                                                <School size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">University of Toronto</p>
                                                <p className="text-xs text-gray-500">Canada • 76 applications</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                            <div className="h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center text-amber-700">
                                                <School size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">Technical University of Munich</p>
                                                <p className="text-xs text-gray-500">Germany • 65 applications</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                            <div className="h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center text-amber-700">
                                                <School size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">University of Melbourne</p>
                                                <p className="text-xs text-gray-500">Australia • 58 applications</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                            <div className="h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center text-amber-700">
                                                <School size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">National University of Singapore</p>
                                                <p className="text-xs text-gray-500">Singapore • 51 applications</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}