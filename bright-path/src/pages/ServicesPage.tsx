import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    BookOpen,
    FileText,
    Globe,
    Briefcase,
    CreditCard,
    CheckCircle,
    ArrowRight,
    Users,
    Calendar
} from "lucide-react";
import { colorMap } from "@/constants/services";

const services = [
    {
        id: "counseling",
        title: "Career Counseling",
        description: "Get personalized guidance to identify the right program and university based on your academic profile, career goals, and preferences.",
        icon: <GraduationCap size={24} />,
        color: "purple",
        features: [
            "One-on-one sessions with expert counselors",
            "Personalized program recommendations",
            "Career path analysis and planning",
            "University shortlisting based on your profile"
        ],
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "test-prep",
        title: "Test Preparation",
        description: "Comprehensive preparation for standardized tests required for admissions including IELTS, TOEFL, GRE, GMAT, SAT and more.",
        icon: <BookOpen size={24} />,
        color: "blue",
        features: [
            "Expert-led prep courses for all major tests",
            "Practice tests with detailed feedback",
            "Small batch and one-on-one coaching",
            "Score improvement guarantee"
        ],
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "admissions",
        title: "Admission Guidance",
        description: "End-to-end support for your university applications, from selecting programs to submitting compelling applications.",
        icon: <FileText size={24} />,
        color: "emerald",
        features: [
            "Application strategy planning",
            "Essay and statement of purpose review",
            "Resume and portfolio development",
            "Interview preparation"
        ],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "scholarships",
        title: "Scholarship Guidance",
        description: "Discover and apply for scholarships, grants, and financial aid opportunities to fund your international education.",
        icon: <CreditCard size={24} />,
        color: "amber",
        features: [
            "Personalized scholarship matching",
            "Application assistance for financial aid",
            "Scholarship essay review and feedback",
            "Alternative funding options guidance"
        ],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2036&auto=format&fit=crop"
    },
    {
        id: "career",
        title: "Post-Graduation Support",
        description: "Guidance for internships, post-study work opportunities, and career development in your host country after graduation.",
        icon: <Briefcase size={24} />,
        color: "indigo",
        features: [
            "Job search strategies for international students",
            "Resume and cover letter optimization",
            "Interview preparation for global companies",
            "Work visa and immigration guidance"
        ],
        image: "https://images.unsplash.com/photo-1573167710701-35950a41e251?q=80&w=2069&auto=format&fit=crop"
    }
]

export default function ServicesPage() {
    return (
        <div className="pt-12">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                        alt="Students collaborating"
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
                            Comprehensive Support
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl text-gray-100 mb-10">
                            From selecting the right program to settling in your destination country,
                            we provide end-to-end support for your international education journey.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 rounded-full px-8" asChild>
                                <Link to="#service-categories">Explore Services</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-8" asChild>
                                <Link to="/contact">Request Consultation</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Service Approach */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Our Approach</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">How We Work With You</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Our personalized approach ensures that you receive guidance tailored to your unique needs and goals.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                number: "01",
                                title: "Assessment",
                                description: "We begin by understanding your academic background, career aspirations, and preferences.",
                                icon: <Users />
                            },
                            {
                                number: "02",
                                title: "Planning",
                                description: "We create a customized roadmap outlining the best path to achieve your educational goals.",
                                icon: <FileText />
                            },
                            {
                                number: "03",
                                title: "Application",
                                description: "We guide you through applications for universities, scholarships, and visas.",
                                icon: <CheckCircle />
                            },
                            {
                                number: "04",
                                title: "Transition",
                                description: "We help you prepare for your journey and settle into your new academic environment.",
                                icon: <Globe />
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative text-center px-4"
                            >
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-gray-200 z-0">
                                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 border-t-2 border-r-2 border-gray-200"></div>
                                    </div>
                                )}
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 mx-auto mb-4">
                                        {step.icon}
                                    </div>
                                    <div className="bg-white py-4">
                                        <div className="text-sm font-bold text-purple-600 mb-2">{step.number}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Categories */}
            <section id="service-categories" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Comprehensive Solutions</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore our range of specialized services designed to support every aspect of your international education journey.
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden ${colorMap[service.color].shadow} shadow-lg`}
                            >
                                <div className={`h-full ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover object-center min-h-[300px]"
                                    />
                                </div>

                                <div className={`p-8 md:p-12 ${colorMap[service.color].light}`}>
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorMap[service.color].medium} ${colorMap[service.color].text} mb-6`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-700 mb-8">{service.description}</p>

                                    <div className="space-y-3 mb-8">
                                        {service.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-start">
                                                <CheckCircle className={`flex-shrink-0 w-5 h-5 ${colorMap[service.color].text} mr-3 mt-0.5`} />
                                                <p className="text-gray-700">{feature}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className={`bg-gradient-to-r ${colorMap[service.color].gradient} text-white hover:opacity-90 rounded-full px-6`} asChild>
                                        <Link to={`/services/${service.id}`}>
                                            Learn More <ArrowRight size={16} className="ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Stay Updated</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Upcoming Events & Webinars</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Join our virtual and in-person events to learn more about study abroad opportunities and connect with university representatives.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "University Fair 2025",
                                date: "May 15, 2025",
                                time: "10:00 AM - 4:00 PM",
                                location: "Virtual Event",
                                description: "Connect with representatives from 50+ top universities from around the world.",
                                type: "Fair",
                                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                            },
                            {
                                title: "Scholarship Workshop",
                                date: "June 2, 2025",
                                time: "2:00 PM - 3:30 PM",
                                location: "Online Webinar",
                                description: "Learn strategies to secure scholarships for your international education.",
                                type: "Workshop",
                                image: "https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2047&auto=format&fit=crop"
                            },
                            {
                                title: "Study in Canada Seminar",
                                date: "June 18, 2025",
                                time: "5:00 PM - 6:30 PM",
                                location: "BrightPath Office, New York",
                                description: "Everything you need to know about studying in Canada - visas, universities, and more.",
                                type: "Seminar",
                                image: "https://images.unsplash.com/photo-1473042904451-00171c69419d?q=80&w=2099&auto=format&fit=crop"
                            }
                        ].map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300 border border-gray-100"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                            {event.type}
                                        </span>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Calendar size={14} className="mr-1" />
                                            {event.date}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-4">{event.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{event.time} | {event.location}</span>
                                        <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50" size="sm" asChild>
                                            <Link to="#">Register</Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full px-6" asChild>
                            <Link to="/events">View All Events</Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    )
}