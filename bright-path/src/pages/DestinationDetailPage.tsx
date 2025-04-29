import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Globe,
    School,
    GraduationCap,
    DollarSign,
    MapPin,
    Building,
    Users,
    CheckCircle,
    Star,
    BookOpen,
    Calendar,
    Clock,
    Loader2
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Destination } from "@/types";

export default function DestinationDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [destination, setDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDestination = async () => {
            if (!id) {
                setError("Destination ID is missing");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const docRef = doc(db, "destinations", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDestination({ id: docSnap.id, ...docSnap.data() } as Destination);
                } else {
                    setError("Destination not found");
                }
            } catch (err) {
                console.error("Error fetching destination:", err);
                setError("Failed to load destination details");
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <Loader2 size={40} className="text-purple-600 animate-spin mb-4" />
                <p className="text-gray-600">Loading destination details...</p>
            </div>
        );
    }

    if (error || !destination) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <Globe className="h-16 w-16 text-purple-200 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Destination Not Found</h1>
                    <p className="text-gray-600 mb-6">{error || "The destination you're looking for doesn't exist or has been removed."}</p>
                    <Button asChild>
                        <Link to="/destinations">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to All Destinations
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-12">
            <section className="relative">
                <div className="absolute inset-0 h-[50vh] z-0">
                    <div className="h-full w-full">
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
                    </div>
                </div>

                <div className="relative z-10 container mx-auto px-4 pt-6">
                    <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20" asChild>
                        <Link to="/destinations">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            All Destinations
                        </Link>
                    </Button>
                </div>

                <div className="relative z-10 container mx-auto px-4 pt-16 pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white max-w-3xl"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                                <Globe className="mr-1 h-3.5 w-3.5" />
                                {destination.continent}
                            </Badge>
                            {destination.featured && (
                                <Badge className="bg-amber-500/90 text-white border-none">
                                    <Star className="mr-1 h-3.5 w-3.5" />
                                    Featured Destination
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
                        <p className="text-xl text-white/90 max-w-2xl">{destination.tagline}</p>
                    </motion.div>
                </div>
            </section>

            <section className="relative z-20 -mt-20 pb-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left 2/3 */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card className="bg-white">
                                    <CardContent className="p-4 flex flex-col items-center text-center">
                                        <School className="h-8 w-8 text-purple-600 mb-2" />
                                        <h3 className="text-2xl font-bold text-gray-900">{destination.universities}</h3>
                                        <p className="text-sm text-gray-500">Universities</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white">
                                    <CardContent className="p-4 flex flex-col items-center text-center">
                                        <GraduationCap className="h-8 w-8 text-purple-600 mb-2" />
                                        <h3 className="text-2xl font-bold text-gray-900">{destination.programsCount}+</h3>
                                        <p className="text-sm text-gray-500">Programs</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white">
                                    <CardContent className="p-4 flex flex-col items-center text-center">
                                        <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
                                        <h3 className="text-base font-bold text-gray-900">{destination.averageTuition}</h3>
                                        <p className="text-sm text-gray-500">Average Tuition</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white">
                                    <CardContent className="p-4 flex flex-col items-center text-center">
                                        <Users className="h-8 w-8 text-purple-600 mb-2" />
                                        <h3 className="text-2xl font-bold text-gray-900">250K+</h3>
                                        <p className="text-sm text-gray-500">Int'l Students</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Tabbed Content */}
                            <Card className="bg-white">
                                <Tabs defaultValue="overview">
                                    <div className="border-b">
                                        <TabsList className="px-4 pt-4">
                                            <TabsTrigger value="overview">Overview</TabsTrigger>
                                            <TabsTrigger value="universities">Universities</TabsTrigger>
                                            <TabsTrigger value="programs">Programs</TabsTrigger>
                                            <TabsTrigger value="visa">Visa Info</TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <TabsContent value="overview" className="p-6">
                                        {/* Overview Content */}
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                                                <p className="text-gray-700 mb-4">
                                                    {destination.name} offers a world-class education system that attracts thousands of international students every year.
                                                    With a diverse range of programs, cutting-edge research facilities, and a supportive environment for international students,
                                                    it's an excellent destination for pursuing higher education.
                                                </p>
                                                <p className="text-gray-700">
                                                    The country's educational institutions are known for their academic excellence, innovative teaching methods,
                                                    and strong connections with industry partners, ensuring graduates are well-prepared for the global job market.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h3>
                                                <ul className="space-y-2">
                                                    {destination.highlights.map((highlight, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                            <span className="text-gray-700">{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Calendar</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-center mb-2">
                                                            <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                                                            <h4 className="font-medium">Fall Semester</h4>
                                                        </div>
                                                        <p className="text-gray-600 text-sm">September to December</p>
                                                        <p className="text-gray-500 text-xs mt-1">Application deadline: January-March</p>
                                                    </div>
                                                    <div className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-center mb-2">
                                                            <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                                                            <h4 className="font-medium">Spring Semester</h4>
                                                        </div>
                                                        <p className="text-gray-600 text-sm">January to May</p>
                                                        <p className="text-gray-500 text-xs mt-1">Application deadline: August-October</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="universities" className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Universities in {destination.name}</h2>
                                        <div className="space-y-4">
                                            {/* Sample universities - in a real app, these would come from your database */}
                                            {[1, 2, 3, 4, 5].map((_, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-start gap-4">
                                                        <div className="h-12 w-12 bg-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                                                            <Building className="h-6 w-6 text-purple-700" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">
                                                                {index === 0 && destination.name === "United Kingdom" && "University of Oxford"}
                                                                {index === 0 && destination.name === "United States" && "Harvard University"}
                                                                {index === 0 && destination.name === "Canada" && "University of Toronto"}
                                                                {index === 0 && destination.name === "Australia" && "University of Melbourne"}
                                                                {index === 0 && destination.name === "Singapore" && "National University of Singapore"}
                                                                {index === 1 && destination.name === "United Kingdom" && "University of Cambridge"}
                                                                {index === 1 && destination.name === "United States" && "Stanford University"}
                                                                {index === 1 && destination.name === "Canada" && "University of British Columbia"}
                                                                {index === 1 && destination.name === "Australia" && "University of Sydney"}
                                                                {index === 1 && destination.name === "Singapore" && "Nanyang Technological University"}
                                                                {index === 2 && destination.name === "United Kingdom" && "Imperial College London"}
                                                                {index === 2 && destination.name === "United States" && "MIT"}
                                                                {index === 2 && destination.name === "Canada" && "McGill University"}
                                                                {index === 2 && destination.name === "Australia" && "Australian National University"}
                                                                {index === 2 && destination.name === "Singapore" && "Singapore Management University"}
                                                                {(index > 2 || (index <= 2 && !["United Kingdom", "United States", "Canada", "Australia", "Singapore"].includes(destination.name))) &&
                                                                    `University of ${destination.name} ${index + 1}`
                                                                }
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                                    <Star className="h-3 w-3 mr-1" />
                                                                    Top Ranked
                                                                </Badge>
                                                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                                                    <BookOpen className="h-3 w-3 mr-1" />
                                                                    {100 - index * 15}+ Programs
                                                                </Badge>
                                                            </div>
                                                            <p className="text-gray-600 text-sm mt-2">
                                                                {index === 0 ? "World-renowned for research excellence and academic innovation." :
                                                                    index === 1 ? "Strong industry connections and exceptional graduate outcomes." :
                                                                        "Offers a diverse range of programs with state-of-the-art facilities."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center mt-6">
                                            <Button variant="outline" className="text-purple-600 border-purple-300">
                                                View All Universities
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="programs" className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Programs in {destination.name}</h2>
                                        <div className="space-y-4">
                                            {["Business & Management", "Computer Science & IT", "Engineering", "Medicine & Health Sciences", "Arts & Humanities"].map((program, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <h3 className="font-medium text-gray-900 mb-2">{program}</h3>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {program === "Medicine & Health Sciences" ? "4-6 Years" : "3-4 Years"}
                                                        </Badge>
                                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                            <DollarSign className="h-3 w-3 mr-1" />
                                                            {program === "Medicine & Health Sciences" ? "$$$$" : program === "Engineering" ? "$$$" : "$$"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">
                                                        {index === 0 && "Develop leadership skills and business acumen in one of the world's most dynamic markets."}
                                                        {index === 1 && "Learn cutting-edge technologies in a country known for innovation and digital advancement."}
                                                        {index === 2 && "Access state-of-the-art facilities and connect with leading engineering firms."}
                                                        {index === 3 && "Study in world-class medical schools with advanced research opportunities."}
                                                        {index === 4 && "Immerse yourself in a rich cultural environment with renowned faculty."}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="visa" className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Visa Information for {destination.name}</h2>
                                        <div className="space-y-6">
                                            <p className="text-gray-700">
                                                International students planning to study in {destination.name} will need to obtain a student visa.
                                                Below is general information about the student visa process, but requirements may change, so always
                                                check with the official immigration website or nearest embassy/consulate.
                                            </p>

                                            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                                                <h3 className="font-semibold text-gray-900 mb-3">Key Requirements</h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <span className="text-gray-700 font-medium">Acceptance Letter</span>
                                                            <p className="text-gray-600 text-sm">Official letter of acceptance from a recognized institution</p>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <span className="text-gray-700 font-medium">Proof of Finances</span>
                                                            <p className="text-gray-600 text-sm">Evidence of sufficient funds to cover tuition and living expenses</p>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <span className="text-gray-700 font-medium">Health Insurance</span>
                                                            <p className="text-gray-600 text-sm">Valid health insurance coverage for the duration of your stay</p>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <span className="text-gray-700 font-medium">Language Proficiency</span>
                                                            <p className="text-gray-600 text-sm">Proof of English proficiency (or local language where applicable)</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Work Permission</h3>
                                                <p className="text-gray-700 mb-2">
                                                    {destination.name === "United Kingdom" && "Students can work up to 20 hours per week during term time and full-time during holidays."}
                                                    {destination.name === "United States" && "F-1 students can work on-campus and may be eligible for Optional Practical Training (OPT) after their program."}
                                                    {destination.name === "Canada" && "Students can work up to 20 hours per week during academic sessions and full-time during scheduled breaks."}
                                                    {destination.name === "Australia" && "Student visa holders can work up to 40 hours per fortnight when their course is in session."}
                                                    {destination.name === "Singapore" && "International students are allowed to work part-time for up to 16 hours per week during term time."}
                                                    {!["United Kingdom", "United States", "Canada", "Australia", "Singapore"].includes(destination.name) &&
                                                        "Students may be eligible to work part-time while studying, with specific hour limitations during academic terms."}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <Button className="bg-purple-600 hover:bg-purple-700">
                                                    Get Visa Guidance
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </Card>
                        </div>

                        {/* Sidebar - Right 1/3 */}
                        <div className="space-y-6">
                            {/* Application Info */}
                            <Card className="bg-white">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Start Your Journey</h2>
                                    <p className="text-gray-600 mb-6">
                                        Ready to study in {destination.name}? Our expert advisors will guide you through every step of your application.
                                    </p>

                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
                                        Apply Now
                                    </Button>

                                    <Button variant="outline" className="w-full">
                                        Schedule Consultation
                                    </Button>

                                    <div className="border-t border-gray-200 mt-6 pt-6">
                                        <h3 className="font-medium text-gray-900 mb-2">Application Timeline</h3>
                                        <div className="space-y-3">
                                            <div className="flex">
                                                <div className="w-1/3 text-gray-500 text-sm">Fall Intake:</div>
                                                <div className="w-2/3 text-gray-700 text-sm font-medium">January - March</div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 text-gray-500 text-sm">Spring Intake:</div>
                                                <div className="w-2/3 text-gray-700 text-sm font-medium">August - October</div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 text-gray-500 text-sm">Visa Process:</div>
                                                <div className="w-2/3 text-gray-700 text-sm font-medium">2-3 months</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Cost of Living</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-600">Accommodation</span>
                                                <span className="text-gray-900 font-medium">
                                                    {destination.name === "United Kingdom" && "£600-1,200/month"}
                                                    {destination.name === "United States" && "$800-2,000/month"}
                                                    {destination.name === "Canada" && "CAD 800-1,500/month"}
                                                    {destination.name === "Australia" && "AUD 800-1,700/month"}
                                                    {destination.name === "Singapore" && "SGD 800-2,000/month"}
                                                    {!["United Kingdom", "United States", "Canada", "Australia", "Singapore"].includes(destination.name) &&
                                                        "$600-1,500/month"}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-600">Food</span>
                                                <span className="text-gray-900 font-medium">
                                                    {destination.name === "United Kingdom" && "£200-400/month"}
                                                    {destination.name === "United States" && "$300-500/month"}
                                                    {destination.name === "Canada" && "CAD 300-500/month"}
                                                    {destination.name === "Australia" && "AUD 300-500/month"}
                                                    {destination.name === "Singapore" && "SGD 300-600/month"}
                                                    {!["United Kingdom", "United States", "Canada", "Australia", "Singapore"].includes(destination.name) &&
                                                        "$200-400/month"}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-600">Transportation</span>
                                                <span className="text-gray-900 font-medium">
                                                    {destination.name === "United Kingdom" && "£50-150/month"}
                                                    {destination.name === "United States" && "$60-200/month"}
                                                    {destination.name === "Canada" && "CAD 80-150/month"}
                                                    {destination.name === "Australia" && "AUD 80-150/month"}
                                                    {destination.name === "Singapore" && "SGD 50-100/month"}
                                                    {!["United Kingdom", "United States", "Canada", "Australia", "Singapore"].includes(destination.name) &&
                                                        "$50-150/month"}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-600">Utilities & Internet</span>
                                                <span className="text-gray-900 font-medium">
                                                    {destination.name === "United Kingdom" && "£100-200/month"}
                                                    {destination.name === "United States" && "$150-250/month"}
                                                    {destination.name === "Canada" && "CAD 150-250/month"}
                                                    {destination.name === "Australia" && "AUD 150-250/month"}
                                                    {destination.name === "Singapore" && "SGD 100-200/month"}
                                                    {!["United Kingdom", "United States", "Canada", "Australia", "Singapore"].includes(destination.name) &&
                                                        "$100-200/month"}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 mt-6 pt-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Average Monthly Expenses</span>
                                            <span className="text-lg font-bold text-gray-900">
                                                {destination.name === "United Kingdom" && "£950-1,950"}
                                                {destination.name === "United States" && "$1,310-2,950"}
                                                {destination.name === "Canada" && "CAD 1,330-2,400"}
                                                {destination.name === "Australia" && "AUD 1,330-2,600"}
                                                {destination.name === "Singapore" && "SGD 1,250-2,900"}
                                                {!["United Kingdom", "United States", "Canada", "Australia", "Singapore"].includes(destination.name) &&
                                                    "$950-2,250"}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
