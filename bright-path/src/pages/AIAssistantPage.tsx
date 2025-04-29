import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Bot,
    Send,
    User,
    Sparkles,
    Globe,
    GraduationCap,
    BookOpen,
    FileText,
    Loader2,
    RefreshCw,
    Share2,
    Download,
    CheckCircle,
    Briefcase,
    GraduationCapIcon,
} from "lucide-react";
import geminiService from "@/services/geminiService";
import { formatMessageContent } from "@/lib/utils";

type Message = {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: Date;
    isLoading?: boolean;
}

const quickQuestions = [
    {
        icon: <Globe size={18} />,
        text: "Compare studying in USA vs UK"
    },
    {
        icon: <GraduationCap size={18} />,
        text: "Best universities for Computer Science"
    },
    {
        icon: <BookOpen size={18} />,
        text: "How to prepare for IELTS?"
    },
    {
        icon: <FileText size={18} />,
        text: "Scholarship application tips"
    }
]

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            content: "👋 Hi there! I'm Brightie, your AI study abroad assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);

    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showPopupTip, setShowPopupTip] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopupTip(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleSendMessage = async (content: string = inputValue) => {
        if (!content.trim()) return;
        const messageId = Date.now().toString();

        const userMessage: Message = {
            id: messageId,
            content,
            sender: "user",
            timestamp: new Date(),
        }

        const loadingMessage: Message = {
            id: `loading-${messageId}`,
            content: "",
            sender: "bot",
            timestamp: new Date(),
            isLoading: true
        }

        setMessages((prev) => [...prev, userMessage, loadingMessage]);
        setInputValue("");
        setIsTyping(true);
        try {
            const response = await geminiService.sendMessage(content);

            setMessages((prev) =>
                prev.map(msg => msg.id === `loading-${messageId}`
                    ? {
                        id: `response-${messageId}`,
                        content: response,
                        sender: "bot",
                        timestamp: new Date(),
                        isLoading: false
                    } : msg
                )
            );
        } catch (error) {
            console.error("Error getting response:", error);

            setMessages((prev) =>
                prev.map(msg => msg.id === `loading-${messageId}`
                    ? {
                        id: `error-${messageId}`,
                        content: "I'm sorry, I encountered an error processing your request. Please try again.",
                        sender: "bot",
                        timestamp: new Date(),
                        isLoading: false
                    } : msg
                )
            );
        } finally {
            setIsTyping(false);
        }
    };

    const resetConversation = () => {
        geminiService.resetChat();

        setMessages([
            {
                id: "welcome-reset",
                content: "👋 Hi there! I'm Brightie, your AI study abroad assistant. How can I help you today?",
                sender: "bot",
                timestamp: new Date(),
            },
        ]);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="flex flex-col min-h-screen pt-12">
            <section className="relative py-20 md:py-28">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
                        alt="AI Technology"
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
                        <div className="flex justify-center mb-6">
                            <motion.div
                                className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Sparkles size={36} className="text-white" />
                            </motion.div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Meet Brightie
                        </h1>
                        <p className="text-xl text-white md:text-2xl mb-8">
                            Your personal AI assistant for all study abroad questions
                        </p>
                    </motion.div>
                </div>
            </section>


            <section className="flex-grow bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="bg-purple-600 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <Bot size={24} className="text-white" />
                                    <h2 className="text-white font-semibold ml-2 text-lg">Brightie</h2>
                                    <div className="flex ml-3 items-center">
                                        <span className="bg-green-400 rounded-full h-2.5 w-2.5"></span>
                                        <span className="text-purple-100 text-sm ml-1">Online</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={resetConversation}
                                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                                        title="Start New Conversation"
                                    >
                                        <RefreshCw size={18} />
                                    </button>
                                    <button
                                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                                        title="Share Conversation"
                                    >
                                        <Share2 size={18} />
                                    </button>
                                    <button
                                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                                        title="Download Conversation"
                                    >
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="h-[500px] overflow-y-auto p-6 bg-gray-50 relative">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={message.id}
                                        className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                        initial="hidden"
                                        animate="visible"
                                        variants={variants}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className={`flex items-start max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                                            <div
                                                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.sender === "user"
                                                    ? "bg-purple-600 ml-2"
                                                    : "bg-indigo-600 mr-2"
                                                    }`}
                                            >
                                                {message.sender === "user" ? (
                                                    <User size={16} className="text-white" />
                                                ) : (
                                                    <Bot size={16} className="text-white" />
                                                )}
                                            </div>
                                            <div
                                                className={`py-3 px-4 rounded-2xl ${message.sender === "user"
                                                    ? "bg-purple-600 text-white rounded-tr-none"
                                                    : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                                                    }`}
                                            >
                                                {message.isLoading ? (
                                                    <div className="flex space-x-1 h-6 items-center">
                                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {showPopupTip && messages.length < 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 border border-purple-200 max-w-xs z-10"
                                    >
                                        <div className="flex items-start mb-2">
                                            <Bot size={18} className="text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-gray-700">
                                                Try asking me about university recommendations, application processes, or scholarship opportunities!
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowPopupTip(false)}
                                            className="text-xs text-purple-600 hover:underline mt-1 float-right"
                                        >
                                            Got it
                                        </button>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickQuestions.map((q, index) => (
                                        <motion.button
                                            key={index}
                                            className="bg-white text-sm text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 hover:border-purple-300 hover:bg-purple-50 flex items-center gap-1.5 transition-colors"
                                            onClick={() => handleSendMessage(q.text)}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {q.icon}
                                            <span>{q.text}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-white border-t border-gray-200">
                                <form
                                    className="flex"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                >
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Ask anything about studying abroad..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-purple-600 hover:bg-purple-700 rounded-r-full px-4 flex items-center"
                                        disabled={isTyping || !inputValue.trim()}
                                    >
                                        {isTyping ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Send className="h-5 w-5" />
                                        )}
                                        <span className="ml-2">Send</span>
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Smart Assistance</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How Brightie Can Help You
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Your AI study abroad assistant is equipped with specialized knowledge to provide personalized guidance on your educational journey
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "University Matching",
                                description: "Get personalized university recommendations based on your profile, preferences, and goals.",
                                icon: <GraduationCap size={32} className="text-purple-600" />
                            },
                            {
                                title: "Country Comparisons",
                                description: "Compare living costs, education systems, work opportunities, and visa requirements across countries.",
                                icon: <Globe size={32} className="text-purple-600" />
                            },
                            {
                                title: "Application Guidance",
                                description: "Step-by-step assistance with applications, documents, essays, and deadlines.",
                                icon: <FileText size={32} className="text-purple-600" />
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-purple-50 rounded-xl p-6 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
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
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Simple Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Brightie uses advanced AI to provide you with accurate and personalized information
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Ask a Question",
                                description: "Type your study abroad question or select from our quick questions",
                                icon: <FileText className="text-purple-600" size={28} />
                            },
                            {
                                step: "02",
                                title: "Get Smart Answers",
                                description: "Brightie analyzes your question and provides detailed, relevant information",
                                icon: <Bot className="text-purple-600" size={28} />
                            },
                            {
                                step: "03",
                                title: "Explore Options",
                                description: "Dive deeper by asking follow-up questions about specific topics",
                                icon: <Globe className="text-purple-600" size={28} />
                            },
                            {
                                step: "04",
                                title: "Take Action",
                                description: "Use the guidance to make informed decisions about your education",
                                icon: <CheckCircle className="text-purple-600" size={28} />
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative text-center"
                            >
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-10 right-0 w-full h-0.5 bg-purple-200 z-0">
                                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 border-t-2 border-r-2 border-purple-200"></div>
                                    </div>
                                )}
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        {step.icon}
                                    </div>
                                    <div className="bg-purple-50 py-6 px-4 rounded-lg md:h-44 flex flex-col justify-center">
                                        <span className="text-sm font-bold text-purple-700 mb-2">{step.step}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-gray-600 text-sm">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Success Stories</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Students Love Brightie
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Hear from students who used our AI assistant to navigate their study abroad journey
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Alex Chen",
                                location: "Now studying at MIT",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
                                quote: "Brightie helped me sort through the complex application process for MIT. It provided clear guidance on what documents I needed and how to structure my personal statement."
                            },
                            {
                                name: "Sara Patel",
                                location: "Secured full scholarship at Oxford",
                                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop",
                                quote: "I asked Brightie about scholarship opportunities in the UK, and it gave me a detailed breakdown of options I hadn't even considered. Thanks to this guidance, I secured a full scholarship!"
                            },
                            {
                                name: "Michael Thompson",
                                location: "Studying in Germany",
                                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop",
                                quote: "The country comparison feature was invaluable! Brightie helped me decide between Germany and France by providing detailed information about cost of living, language requirements, and job prospects."
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-purple-50 rounded-xl overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="h-12 w-12 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                                            <p className="text-sm text-purple-600">{testimonial.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Powerful Knowledge</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Trained on Extensive Study Abroad Data
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Brightie is powered by advanced AI technology and extensive knowledge about global education opportunities, admission requirements, scholarships, and more.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                {[
                                    {
                                        title: "Universities & Programs",
                                        description: "Information on thousands of universities and programs worldwide",
                                        icon: <GraduationCapIcon size={20} className="text-purple-600" />
                                    },
                                    {
                                        title: "Country-Specific Information",
                                        description: "Details on education systems, visa requirements, and living costs",
                                        icon: <Globe size={20} className="text-purple-600" />
                                    },
                                    {
                                        title: "Application Processes",
                                        description: "Step-by-step guidance for admissions and documentation",
                                        icon: <FileText size={20} className="text-purple-600" />
                                    },
                                    {
                                        title: "Career Pathways",
                                        description: "Insights on post-graduation opportunities and work permits",
                                        icon: <Briefcase size={20} className="text-purple-600" />
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="bg-purple-100 p-2 rounded-md mr-3 mt-1">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6" asChild>
                                <Link to="/services">Explore Our Services</Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
                                alt="AI technology illustration"
                                className="w-full h-auto rounded-xl shadow-lg"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg max-w-xs">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bot size={18} className="text-purple-600" />
                                    <span className="font-semibold text-gray-900">Constantly Learning</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Our AI is continuously updated with the latest information about universities, scholarships, and visa requirements
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}