import { motion } from "framer-motion";
import { Shield, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-16 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center my-12"
                >
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-6">
                        <Shield className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We value your privacy and are committed to protecting your personal information.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <Card className="border-purple-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="font-medium text-purple-700">Last Updated:</span>
                                <span className="ml-2 text-gray-600">April 22, 2025</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="text-purple-600 border-purple-200" asChild>
                                    <a href="#" onClick={() => window.print()}>Print</a>
                                </Button>
                                <Button variant="outline" size="sm" className="text-purple-600 border-purple-200" asChild>
                                    <a href="javascript:void(0)" onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert("Link copied to clipboard!");
                                    }}>
                                        Share
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-purple max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                >
                    <h2>Introduction</h2>
                    <p>
                        At BrightPath, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2>The Data We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data</strong>: includes first name, last name, username or similar identifier, date of birth.</li>
                        <li><strong>Contact Data</strong>: includes email address, telephone numbers, and mailing address.</li>
                        <li><strong>Educational Data</strong>: includes academic history, test scores, and educational interests.</li>
                        <li><strong>Technical Data</strong>: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                        <li><strong>Profile Data</strong>: includes your interests, preferences, feedback and survey responses.</li>
                        <li><strong>Usage Data</strong>: includes information about how you use our website and services.</li>
                    </ul>

                    <h2>How We Use Your Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>To register you as a new customer.</li>
                        <li>To provide educational guidance and university matching services.</li>
                        <li>To manage our relationship with you.</li>
                        <li>To improve our website, services, and customer relationships.</li>
                        <li>To recommend content, services, or features that may be of interest to you.</li>
                        <li>To comply with legal obligations.</li>
                    </ul>

                    <h2>Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                    </p>

                    <h2>Data Retention</h2>
                    <p>
                        We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                    </p>

                    <h2>Your Legal Rights</h2>
                    <p>
                        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                    </p>
                    <ul>
                        <li>Request access to your personal data.</li>
                        <li>Request correction of your personal data.</li>
                        <li>Request erasure of your personal data.</li>
                        <li>Object to processing of your personal data.</li>
                        <li>Request restriction of processing your personal data.</li>
                        <li>Request transfer of your personal data.</li>
                        <li>Right to withdraw consent.</li>
                    </ul>

                    <h2>Third-Party Links</h2>
                    <p>
                        Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                    </p>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                    </p>
                    <p>
                        <strong>Email</strong>: privacy@brightpath.edu<br />
                        <strong>Phone</strong>: +1 (555) 123-4567<br />
                        <strong>Address</strong>: 123 Education Street, New York, NY 10001, USA
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 space-y-4"
                >
                    <h3 className="text-lg font-semibold text-gray-900">Related Policies</h3>
                    <div className="flex flex-col gap-2">
                        <Link to="/terms" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                            <span className="font-medium text-gray-800">Terms of Service</span>
                            <ChevronRight className="h-5 w-5 text-purple-500" />
                        </Link>
                        <Link to="/cookie-policy" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                            <span className="font-medium text-gray-800">Cookie Policy</span>
                            <ChevronRight className="h-5 w-5 text-purple-500" />
                        </Link>
                    </div>
                </motion.div>

                <div className="mt-12 text-center">
                    <Button variant="outline" className="text-purple-600 border-purple-200" asChild>
                        <Link to="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}