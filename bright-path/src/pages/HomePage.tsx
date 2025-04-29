import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, GraduationCap, BookOpen, PlaneTakeoff, Calendar, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop"
                        alt="Students studying abroad"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-indigo-800/70 to-black/70"></div>
                </div>
                <div className="container px-4 mx-auto z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1
                                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Your Global Education <span className="text-purple-300">Journey</span> Starts Here
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-gray-200 mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Connecting ambitious students with world-class universities across the globe.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 py-6 text-lg" asChild>
                                    <Link to="/destinations">Explore Programs</Link>
                                </Button>
                                <Button size="lg" className="text-white border-white hover:bg-white/20 bg-white/10 rounded-full px-8 py-6 text-lg" asChild>
                                    <Link to="/ai-assistant">Talk to an Advisor</Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="hidden lg:block"
                        >
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                                <h3 className="text-white text-xl mb-4 font-medium">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { number: "10k+", label: "Students Placed" },
                                        { number: "50+", label: "Countries" },
                                        { number: "500+", label: "University Partners" },
                                        { number: "95%", label: "Success Rate" }
                                    ].map((stat, index) => (
                                        <div key={index} className="text-center p-3 bg-white/5 rounded-lg">
                                            <div className="text-purple-300 text-2xl font-bold">{stat.number}</div>
                                            <div className="text-gray-300 text-sm">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </motion.div>
            </section>

            {/* Features Section - Updated with better visuals */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Our Services</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">How BrightPath Helps You</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We guide you through every step of your international education journey.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <GraduationCap size={32} />,
                                title: "Career Counseling",
                                desc: "Personalized advice for your academic and career goals",
                                color: "from-purple-50 to-purple-100",
                                iconBg: "bg-purple-100",
                                iconColor: "text-purple-600"
                            },
                            {
                                icon: <BookOpen size={32} />,
                                title: "Test Preparation",
                                desc: "Resources for IELTS, TOEFL, GRE, and other exams",
                                color: "from-blue-50 to-blue-100",
                                iconBg: "bg-blue-100",
                                iconColor: "text-blue-600"
                            },
                            {
                                icon: <PlaneTakeoff size={32} />,
                                title: "Visa Assistance",
                                desc: "Expert guidance for your student visa application",
                                color: "from-indigo-50 to-indigo-100",
                                iconBg: "bg-indigo-100",
                                iconColor: "text-indigo-600"
                            },
                            {
                                icon: <Globe size={32} />,
                                title: "Global Universities",
                                desc: "Access to thousands of programs worldwide",
                                color: "from-pink-50 to-pink-100",
                                iconBg: "bg-pink-100",
                                iconColor: "text-pink-600"
                            },
                            {
                                icon: <Calendar size={32} />,
                                title: "Events & Webinars",
                                desc: "Connect with universities and experts",
                                color: "from-amber-50 to-amber-100",
                                iconBg: "bg-amber-100",
                                iconColor: "text-amber-600"
                            },
                            {
                                icon: <MessageSquare size={32} />,
                                title: "AI Assistant",
                                desc: "Get instant answers with our smart assistant",
                                color: "from-emerald-50 to-emerald-100",
                                iconBg: "bg-emerald-100",
                                iconColor: "text-emerald-600"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`bg-gradient-to-br ${feature.color} rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300`}
                            >
                                <div className={`${feature.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${feature.iconColor}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 mb-4">{feature.desc}</p>
                                <Link
                                    to="#"
                                    className={`inline-flex items-center text-sm font-medium ${feature.iconColor} hover:underline`}
                                >
                                    Learn more <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section - New section */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Why Choose Us</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Trusted Partner for Study Abroad Success</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                We combine years of expertise with personalized attention to ensure your education journey is seamless and successful.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Personalized guidance tailored to your academic profile and career goals",
                                    "Access to exclusive scholarship opportunities and financial aid resources",
                                    "Comprehensive support from application to arrival at your destination",
                                    "Ongoing mentorship throughout your international education journey"
                                ].map((point, index) => (
                                    <div key={index} className="flex items-start">
                                        <CheckCircle className="flex-shrink-0 w-6 h-6 text-purple-600 mr-3 mt-0.5" />
                                        <p className="text-gray-700">{point}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6" asChild>
                                    <Link to="/about">About Our Process</Link>
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="rounded-xl overflow-hidden shadow-xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                alt="Students discussing study abroad options"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Destinations Section - Updated with real images */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Top Destinations</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Popular Study Destinations</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore educational opportunities in these leading global destinations
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "United States",
                                imgUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2089&auto=format&fit=crop",
                                programs: "5000+"
                            },
                            {
                                name: "United Kingdom",
                                imgUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
                                programs: "3200+"
                            },
                            {
                                name: "Canada",
                                imgUrl: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2071&auto=format&fit=crop",
                                programs: "2800+"
                            },
                            {
                                name: "Australia",
                                imgUrl: "https://images.unsplash.com/photo-1546268060-2592ff93ee24?q=80&w=2940&auto=format&fit=crop",
                                programs: "2500+"
                            }
                        ].map((country, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="relative rounded-xl overflow-hidden shadow-lg h-80 group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                                <img
                                    src={country.imgUrl}
                                    alt={`Study in ${country.name}`}
                                    className="absolute inset-0 h-full w-full object-cover z-0 group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <h3 className="text-2xl font-bold text-white mb-1">{country.name}</h3>
                                    <p className="text-purple-200 mb-4">{country.programs} Programs</p>
                                    <div className="transition-all duration-300 max-h-0 group-hover:max-h-24 overflow-hidden">
                                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-800 mt-2" asChild>
                                            <Link to="/destinations">Explore</Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full px-8" asChild>
                            <Link to="/destinations">View All Destinations</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Updated with better visuals */}
            <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
                <div className="container px-4 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Testimonials</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Hear from students who achieved their dreams with BrightPath
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                university: "Oxford University",
                                quote: "BrightPath made my dream of studying at Oxford possible. Their guidance was invaluable throughout my application.",
                                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop"
                            },
                            {
                                name: "David Chen",
                                university: "University of Toronto",
                                quote: "The counselors helped me select the perfect program and guided me through the visa process. Couldn't have done it without them!",
                                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop"
                            },
                            {
                                name: "Aisha Patel",
                                university: "MIT",
                                quote: "From test prep to scholarship applications, BrightPath was with me every step of the way. Forever grateful!",
                                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
                            },
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                                        <p className="text-sm text-purple-600">{testimonial.university}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                                <div className="text-purple-600 text-sm font-medium hover:underline cursor-pointer">
                                    Read full story
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Updated with better visuals */}
            <section className="py-20 relative">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
                        alt="University campus"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-900/80"></div>
                </div>

                <div className="container px-4 mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Begin Your Journey?</h2>
                        <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
                            Join thousands of students who found their perfect educational path with us
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 rounded-full px-8 py-6 text-lg" asChild>
                                <Link to="/signup">Sign Up Now</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 bg-white/10 rounded-full px-8 py-6 text-lg" asChild>
                                <Link to="/ai-assistant">Talk to Our AI Assistant</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}