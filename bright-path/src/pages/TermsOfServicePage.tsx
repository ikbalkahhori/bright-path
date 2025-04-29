import { motion } from "framer-motion";
import { ScrollText, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfServicePage() {
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
                        <ScrollText className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Please read these terms carefully before using our platform.
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
                    <h2>Agreement to Terms</h2>
                    <p>
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and BrightPath ("we," "us" or "our"), concerning your access to and use of the BrightPath website and service.
                    </p>
                    <p>
                        By accessing or using the Service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
                    </p>

                    <h2>Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of BrightPath and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of BrightPath.
                    </p>

                    <h2>User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide us with accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>
                    <p>
                        You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
                    </p>
                    <p>
                        You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                    </p>

                    <h2>Content and Services</h2>
                    <p>
                        Our Service allows you to access educational content, university information, and admission guidance services. The content on our Service is provided for general information purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the Service or the information, products, services, or related graphics contained on the Service for any purpose.
                    </p>

                    <h2>Links To Other Web Sites</h2>
                    <p>
                        Our Service may contain links to third-party web sites or services that are not owned or controlled by BrightPath.
                    </p>
                    <p>
                        BrightPath has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that BrightPath shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
                    </p>

                    <h2>Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                    <p>
                        Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
                    </p>

                    <h2>Limitation Of Liability</h2>
                    <p>
                        In no event shall BrightPath, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                    </p>

                    <h2>Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                    </p>
                    <p>
                        Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                    </p>

                    <h2>Changes</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>
                    <p>
                        By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <p>
                        <strong>Email</strong>: legal@brightpath.edu<br />
                        <strong>Phone</strong>: +1 (555) 123-4567<br />
                        <strong>Address</strong>: 123 Education Street, New York, NY 10001, USA
                    </p>
                </motion.div>

                {/* Related Pages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 space-y-4"
                >
                    <h3 className="text-lg font-semibold text-gray-900">Related Policies</h3>
                    <div className="flex flex-col gap-2">
                        <Link to="/privacy-policy" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                            <span className="font-medium text-gray-800">Privacy Policy</span>
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