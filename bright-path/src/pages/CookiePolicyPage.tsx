import { motion } from "framer-motion";
import { Cookie, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CookiePolicyPage() {
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
                        <Cookie className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Information about how we use cookies and similar technologies on our website.
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
                        This Cookie Policy explains how BrightPath ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at brightpath.edu ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                    </p>

                    <h2>What Are Cookies?</h2>
                    <p>
                        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                    </p>
                    <p>
                        Cookies set by the website owner (in this case, BrightPath) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                    </p>

                    <h2>Why Do We Use Cookies?</h2>
                    <p>
                        We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
                    </p>

                    <h2>Types of Cookies We Use</h2>
                    <p>
                        The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:
                    </p>

                    <h3>Essential Cookies</h3>
                    <p>
                        These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.
                    </p>

                    <h3>Performance and Functionality Cookies</h3>
                    <p>
                        These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                    </p>

                    <h3>Analytics and Customization Cookies</h3>
                    <p>
                        These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you in order to enhance your experience.
                    </p>

                    <h3>Advertising Cookies</h3>
                    <p>
                        These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
                    </p>

                    <h3>Social Media Cookies</h3>
                    <p>
                        These cookies are used to enable you to share pages and content that you find interesting on our Website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
                    </p>

                    <h2>How Can You Control Cookies?</h2>
                    <p>
                        You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by following the directions provided in the Cookie Notice you see when you first visit our Website.
                    </p>
                    <p>
                        You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
                    </p>
                    <p>
                        Most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com</a>.
                    </p>

                    <h2>How Often Will We Update This Cookie Policy?</h2>
                    <p>
                        We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                    </p>
                    <p>
                        The date at the top of this Cookie Policy indicates when it was last updated.
                    </p>

                    <h2>Where Can You Get Further Information?</h2>
                    <p>
                        If you have any questions about our use of cookies or other technologies, please contact us at:
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
                        <Link to="/privacy-policy" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                            <span className="font-medium text-gray-800">Privacy Policy</span>
                            <ChevronRight className="h-5 w-5 text-purple-500" />
                        </Link>
                        <Link to="/terms" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                            <span className="font-medium text-gray-800">Terms of Service</span>
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