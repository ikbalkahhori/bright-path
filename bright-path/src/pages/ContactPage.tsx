import { motion } from "framer-motion";
import {
    Check,
    Mail,
    MapPin,
    Phone,
    Clock,
    Loader2,
    MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";

export default function ContactPage() {
    const {
        formData,
        handleChange,
        handleSelectChange,
        handleSubmit,
        submitting,
        successMessage,
        errorMessage,
        resetForm
    } = useEmailSubmit();

    return (
        <div className="pt-12">
            <section className="relative py-24 md:py-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                        alt="Students discussing study abroad plans"
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
                            Contact Us
                        </h1>
                        <p className="text-xl text-purple-100 mb-8">
                            Have questions about studying abroad? Our team is here to help you every step of the way.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:col-span-1"
                        >
                            <Card className="bg-purple-50 border-purple-100 shadow-sm overflow-hidden py-0">
                                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-4">
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare size={20} />
                                        Get in Touch
                                    </CardTitle>
                                    <CardDescription className="text-purple-100">
                                        Our team is ready to assist you
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 py-10">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <MapPin size={20} className="text-purple-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Visit Us</h3>
                                            <p className="text-gray-600 text-sm">123 Education Street, New York, NY 10001, USA</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <Mail size={20} className="text-purple-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email Us</h3>
                                            <p className="text-gray-600 text-sm">contact@brightpath.edu</p>
                                            <p className="text-gray-600 text-sm">support@brightpath.edu</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <Phone size={20} className="text-purple-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Call Us</h3>
                                            <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                                            <p className="text-gray-600 text-sm">+1 (555) 765-4321</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <Clock size={20} className="text-purple-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Office Hours</h3>
                                            <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                            <p className="text-gray-600 text-sm">Saturday: 10:00 AM - 2:00 PM</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="shadow-md border-gray-200">
                                <CardHeader>
                                    <CardTitle>Send Us a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and our team will get back to you within 24 hours
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {successMessage && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 flex items-start gap-3">
                                                <div className="bg-green-100 rounded-full p-1 mt-0.5">
                                                    <Check size={16} className="text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Message Sent Successfully!</p>
                                                    <p className="text-sm text-green-600">{successMessage}</p>
                                                    <button
                                                        type="button"
                                                        onClick={resetForm}
                                                        className="text-sm text-green-700 font-medium hover:underline mt-2"
                                                    >
                                                        Send another message
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {errorMessage && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                                                <p className="font-medium">Error</p>
                                                <p className="text-sm">{errorMessage}</p>
                                            </div>
                                        )}

                                        {!successMessage && (
                                            <>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="fullName">Full Name</Label>
                                                        <Input
                                                            id="fullName"
                                                            name="fullName"
                                                            placeholder="Your full name"
                                                            required
                                                            value={formData.fullName}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            placeholder="Your email address"
                                                            required
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone">Phone Number (optional)</Label>
                                                        <Input
                                                            id="phone"
                                                            name="phone"
                                                            placeholder="Your phone number"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="subject">Inquiry Type</Label>
                                                        <Select
                                                            name="subject"
                                                            value={formData.subject}
                                                            onValueChange={(value) => handleSelectChange('subject', value)}
                                                        >
                                                            <SelectTrigger id="subject">
                                                                <SelectValue placeholder="Select an inquiry type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                                                <SelectItem value="University Application">University Application</SelectItem>
                                                                <SelectItem value="Visa Assistance">Visa Assistance</SelectItem>
                                                                <SelectItem value="Test Preparation">Test Preparation</SelectItem>
                                                                <SelectItem value="Scholarship Information">Scholarship Information</SelectItem>
                                                                <SelectItem value="Career Counseling">Career Counseling</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="country">Country of Interest</Label>
                                                    <Select
                                                        name="country"
                                                        value={formData.country}
                                                        onValueChange={(value) => handleSelectChange('country', value)}
                                                    >
                                                        <SelectTrigger id="country">
                                                            <SelectValue placeholder="Select a country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="United States">United States</SelectItem>
                                                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                                            <SelectItem value="Canada">Canada</SelectItem>
                                                            <SelectItem value="Australia">Australia</SelectItem>
                                                            <SelectItem value="Germany">Germany</SelectItem>
                                                            <SelectItem value="Netherlands">Netherlands</SelectItem>
                                                            <SelectItem value="Japan">Japan</SelectItem>
                                                            <SelectItem value="Singapore">Singapore</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Message</Label>
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        placeholder="Type your message here..."
                                                        rows={6}
                                                        required
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        className="resize-none"
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                                    disabled={submitting}
                                                >
                                                    {submitting ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Sending Message...
                                                        </>
                                                    ) : (
                                                        "Send Message"
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">FAQ</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Common Questions
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find quick answers to frequently asked questions about our services
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "How soon can I expect a response?",
                                answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our office directly."
                            },
                            {
                                question: "Do you offer virtual consultations?",
                                answer: "Yes, we offer both in-person and virtual consultations via Zoom or other video conferencing platforms to accommodate students from around the world."
                            },
                            {
                                question: "Is there a fee for the initial consultation?",
                                answer: "No, your initial consultation with our education counselors is completely free. We believe in understanding your needs before discussing our services."
                            },
                            {
                                question: "Can I schedule an appointment to visit your office?",
                                answer: "Absolutely! You can schedule an in-person appointment by calling our office or using our online booking system on the website."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-700">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}