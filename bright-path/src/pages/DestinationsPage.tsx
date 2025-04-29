import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Globe,
    Search,
    Bookmark,
    GraduationCap,
    Building,
    DollarSign,
    Star,
    MapPin,
    Briefcase,
    Filter,
    X,
    FileText,
    Loader2
} from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Destination } from "@/types";

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                setLoading(true);
                const destinationsRef = collection(db, "destinations");
                const q = query(destinationsRef, orderBy("name"));
                const querySnapshot = await getDocs(q);

                const destinationsList: Destination[] = [];
                querySnapshot.forEach((doc) => {
                    destinationsList.push({ id: doc.id, ...doc.data() } as Destination);
                });

                setDestinations(destinationsList);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    const filteredDestinations = destinations.filter(destination => {
        const matchesSearch = searchQuery === '' ||
            destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.tagline.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesContinent = activeFilter === 'all' ||
            destination.continent.toLowerCase() === activeFilter.toLowerCase();

        return matchesSearch && matchesContinent;
    });

    const continents = [...new Set(destinations.map(dest => dest.continent))];

    return (
        <div className="pt-12">
            <section className="relative py-24 md:py-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1728985381714-8660eebcf9b5?q=80&w=2940&auto=format&fit=crop"
                        alt="World map with pins"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-black/70"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="text-center text-white max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                            Global Education Opportunities
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Study Destinations
                        </h1>
                        <p className="text-xl text-gray-100 mb-10">
                            Explore popular study abroad destinations and find the perfect location
                            for your international education journey.
                        </p>

                        <div className="max-w-2xl mx-auto relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for a country or university..."
                                    className="w-full py-4 px-6 pl-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                            <Globe className="inline-block mr-2 text-purple-600" size={20} />
                            Discover destinations by region
                        </h2>
                        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 sm:pb-0">
                            <Button
                                variant={activeFilter === 'all' ? "default" : "outline"}
                                size="sm"
                                className={activeFilter === 'all' ? "bg-purple-600 hover:bg-purple-700" : "text-gray-700"}
                                onClick={() => setActiveFilter('all')}
                            >
                                All Destinations
                            </Button>
                            {continents.map((continent) => (
                                <Button
                                    key={continent}
                                    variant={activeFilter === continent.toLowerCase() ? "default" : "outline"}
                                    size="sm"
                                    className={activeFilter === continent.toLowerCase() ? "bg-purple-600 hover:bg-purple-700" : "text-gray-700 cursor-pointer"}
                                    onClick={() => setActiveFilter(continent.toLowerCase())}
                                >
                                    {continent}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end"
                    >
                        <div>
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                Explore Options
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Destinations</h2>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Compare education systems, living costs, and opportunities around the world
                            </p>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700">
                                <Filter size={16} /> Filter Options
                            </Button>
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 size={40} className="text-purple-600 animate-spin mb-4" />
                            <p className="text-gray-600">Loading destinations...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredDestinations.map((destination, index) => (
                                <motion.div
                                    key={destination.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                                >
                                    {/* Destination card with more details */}
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={destination.image}
                                            alt={`Study in ${destination.name}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-1.5">
                                            <Bookmark size={18} className="text-white" />
                                        </div>
                                        {destination.featured && (
                                            <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MapPin size={16} className="text-purple-600" />
                                            <span className="text-sm text-gray-600">{destination.continent}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{destination.name}</h3>
                                        <p className="text-gray-600 mb-5 text-sm">{destination.tagline}</p>

                                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 mb-1 flex items-center">
                                                    <Building size={14} className="mr-1.5" /> Universities
                                                </span>
                                                <span className="font-semibold text-gray-900">{destination.universities}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 mb-1 flex items-center">
                                                    <GraduationCap size={14} className="mr-1.5" /> Programs
                                                </span>
                                                <span className="font-semibold text-gray-900">{destination.programsCount}+</span>
                                            </div>
                                            <div className="flex flex-col col-span-2">
                                                <span className="text-gray-500 mb-1 flex items-center">
                                                    <DollarSign size={14} className="mr-1.5" /> Average Tuition
                                                </span>
                                                <span className="font-semibold text-gray-900">{destination.averageTuition}/year</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <Button className="bg-purple-600 hover:bg-purple-700">
                                                <Link to={`/destinations/${destination.id}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredDestinations.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                                <X size={30} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations found</h3>
                            <p className="text-gray-600 mb-6">
                                No destinations match your current filter criteria.
                            </p>
                            <Button
                                onClick={() => {
                                    setActiveFilter('all');
                                    setSearchQuery('');
                                }}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                View All Destinations
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Country Comparison */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                            Make an Informed Decision
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose These Destinations?</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Each destination offers unique advantages. Compare key factors to find your perfect fit.
                        </p>
                    </motion.div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                            <thead>
                                <tr className="bg-purple-50 text-left">
                                    <th className="py-4 px-6 text-gray-700 font-semibold">Country</th>
                                    <th className="py-4 px-6 text-gray-700 font-semibold">Education Quality</th>
                                    <th className="py-4 px-6 text-gray-700 font-semibold">Cost of Living</th>
                                    <th className="py-4 px-6 text-gray-700 font-semibold">Work Opportunities</th>
                                    <th className="py-4 px-6 text-gray-700 font-semibold">Immigration Pathways</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    {
                                        country: "United States",
                                        education: { rating: 5, text: "World-class" },
                                        costOfLiving: { rating: 4, text: "High" },
                                        workOpportunities: { rating: 4, text: "Excellent" },
                                        immigration: { rating: 3, text: "Moderate" }
                                    },
                                    {
                                        country: "United Kingdom",
                                        education: { rating: 5, text: "World-class" },
                                        costOfLiving: { rating: 4, text: "High" },
                                        workOpportunities: { rating: 3, text: "Good" },
                                        immigration: { rating: 3, text: "Moderate" }
                                    },
                                    {
                                        country: "Canada",
                                        education: { rating: 4, text: "Excellent" },
                                        costOfLiving: { rating: 3, text: "Moderate" },
                                        workOpportunities: { rating: 4, text: "Excellent" },
                                        immigration: { rating: 5, text: "Excellent" }
                                    },
                                    {
                                        country: "Australia",
                                        education: { rating: 4, text: "Excellent" },
                                        costOfLiving: { rating: 4, text: "High" },
                                        workOpportunities: { rating: 4, text: "Excellent" },
                                        immigration: { rating: 4, text: "Good" }
                                    },
                                    {
                                        country: "Germany",
                                        education: { rating: 4, text: "Excellent" },
                                        costOfLiving: { rating: 3, text: "Moderate" },
                                        workOpportunities: { rating: 3, text: "Good" },
                                        immigration: { rating: 3, text: "Moderate" }
                                    }
                                ].map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 font-medium">{item.country}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="flex text-yellow-400 mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} fill={i < item.education.rating ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                                <span>{item.education.text}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="flex text-yellow-400 mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} fill={i < item.costOfLiving.rating ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                                <span>{item.costOfLiving.text}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="flex text-yellow-400 mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} fill={i < item.workOpportunities.rating ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                                <span>{item.workOpportunities.text}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="flex text-yellow-400 mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} fill={i < item.immigration.rating ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                                <span>{item.immigration.text}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-10">
                        <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full px-8">
                            <Link to="/destinations/compare">Detailed Comparison Tool</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials from students studying abroad */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                            Student Stories
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hear from Our Students</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Real experiences from students who are currently studying abroad
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Emma Wilson",
                                country: "United States",
                                university: "Harvard University",
                                program: "Computer Science",
                                quote: "Studying at Harvard has been a transformative experience. The resources, faculty, and network are unparalleled. BrightPath made it possible for me to get here!",
                                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
                                flag: "🇺🇸"
                            },
                            {
                                name: "Raj Patel",
                                country: "Canada",
                                university: "University of Toronto",
                                program: "Business Administration",
                                quote: "The multicultural environment in Toronto has given me a global perspective. The work opportunities post-graduation are amazing, and I'm planning to stay in Canada.",
                                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop",
                                flag: "🇨🇦"
                            },
                            {
                                name: "Liu Wei",
                                country: "Australia",
                                university: "University of Melbourne",
                                program: "Environmental Science",
                                quote: "Australia offers the perfect combination of academic excellence and quality of life. The hands-on approach to learning in my field has been incredibly valuable.",
                                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop",
                                flag: "🇦🇺"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-xl shadow-md"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                                            <span className="ml-2 text-xl" aria-hidden="true">{testimonial.flag}</span>
                                        </div>
                                        <p className="text-purple-600 text-sm">{testimonial.university}</p>
                                        <p className="text-gray-500 text-xs">{testimonial.program}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Studying in {testimonial.country}</span>
                                    <Button variant="outline" className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50" size="sm">
                                        Read Story
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8">
                            <Link to="/testimonials">More Student Stories</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                Additional Resources
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Planning Your Study Abroad Journey
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Beyond choosing a destination, we provide resources to help you
                                prepare for every aspect of your international education.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Country-Specific Guides",
                                        description: "Detailed guides covering visa requirements, accommodation, cost of living, and cultural tips for each country.",
                                        icon: <Globe size={20} className="text-purple-600" />
                                    },
                                    {
                                        title: "University Application Checklists",
                                        description: "Step-by-step checklists customized for each destination to ensure you don't miss any application requirements.",
                                        icon: <FileText size={20} className="text-purple-600" />
                                    },
                                    {
                                        title: "Job Market Insights",
                                        description: "Research on post-graduation employment prospects and in-demand skills in different countries.",
                                        icon: <Briefcase size={20} className="text-purple-600" />
                                    }
                                ].map((resource, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1 bg-purple-100 rounded-md p-2 h-fit">
                                            {resource.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{resource.title}</h3>
                                            <p className="text-gray-600">{resource.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6">
                                    <Link to="/resources">Browse Resources</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <motion.img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                alt="Students planning their study abroad journey"
                                className="w-full h-auto rounded-xl shadow-lg"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg max-w-xs">
                                <div className="flex items-center gap-2 mb-2">
                                    <GraduationCap size={18} className="text-purple-600" />
                                    <span className="font-semibold text-gray-900">Success Rate</span>
                                </div>
                                <p className="text-gray-600 text-sm">95% of our students successfully secure admission to their preferred destinations</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}