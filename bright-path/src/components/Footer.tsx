import { Link } from "react-router";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ChevronRight
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link to="/" className="flex items-center mb-5">
                            <span className="text-2xl font-bold">
                                <span className="text-purple-400">Bright</span>
                                <span className="text-white">Path</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Your trusted partner for international education journeys. Making dreams of studying abroad a reality since 2022.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-gray-700">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About Us", path: "/about" },
                                { name: "Services", path: "/services" },
                                { name: "Destinations", path: "/destinations" },
                                { name: "Events", path: "/events" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="flex items-center group"
                                    >
                                        <ChevronRight size={16} className="text-purple-400 mr-2 transition-transform group-hover:translate-x-1" />
                                        <span className="hover:text-purple-400 transition-colors">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-gray-700">Resources</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Student Guide", path: "#" },
                                { name: "University Rankings", path: "#" },
                                { name: "Scholarship Guide", path: "#" },
                                { name: "Visa Information", path: "#" },
                                { name: "FAQ", path: "/faq" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="flex items-center group"
                                    >
                                        <ChevronRight size={16} className="text-purple-400 mr-2 transition-transform group-hover:translate-x-1" />
                                        <span className="hover:text-purple-400 transition-colors">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-gray-700">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin size={20} className="text-purple-400 mr-3 mt-1 flex-shrink-0" />
                                <span>123 Education Street, New York, NY 10001, USA</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="text-purple-400 mr-3 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="text-purple-400 mr-3 flex-shrink-0" />
                                <span>contact@brightpath.edu</span>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <h4 className="text-white text-sm font-semibold mb-3">Subscribe to Newsletter</h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
                                />
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-950 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-gray-500 mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} BrightPath Education. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/cookie-policy" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}