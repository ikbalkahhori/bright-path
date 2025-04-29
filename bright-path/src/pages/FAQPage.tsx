
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import { MessageSquare } from "lucide-react";

export default function FAQPage() {
    return (
        <div className="pt-12">
            <section className="relative py-24 md:py-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                        alt="Students studying"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-800/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="text-center text-white max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-purple-100 mb-8">
                            Find answers to common questions about studying abroad and how BrightPath can help you
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="mb-12 flex flex-wrap justify-center gap-2">
                            <Button variant="ghost" className="rounded-full px-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
                                All Questions
                            </Button>
                        </div>

                        <FAQ />
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-purple-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Can't Find Your Answer?
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Our team is ready to help with any other questions you might have about your study abroad journey.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6" asChild>
                                    <Link to="/contact">Contact Us</Link>
                                </Button>
                                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100 rounded-full px-6" asChild>
                                    <Link to="/ai-assistant">
                                        <MessageSquare size={18} className="mr-2" />
                                        Ask Brightie AI
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}