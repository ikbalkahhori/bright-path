import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "How accurate is Brightie's information?",
        answer: "Brightie is trained on extensive, up-to-date information about universities, programs, and admission requirements worldwide. The AI assistant is regularly updated to ensure accuracy. While it provides highly reliable guidance, we recommend verifying critical details like application deadlines, specific admission requirements, or visa regulations with official university websites or relevant government portals. Brightie aims to be a starting point in your research process, providing comprehensive guidance that you can then verify through official channels."
    },
    {
        question: "Can Brightie help me choose the right university based on my profile?",
        answer: "Yes, Brightie can provide personalized university recommendations based on various factors including your academic background, test scores, budget, preferred location, intended major, and career goals. For the most accurate recommendations, provide details about your academic performance, standardized test scores, budget constraints, preferred countries/regions, field of study, and any specific requirements you have. Brightie can then analyze this information to suggest universities where you have a strong chance of admission and that align with your personal and academic preferences."
    },
    {
        question: "Can Brightie help me compare different countries for studying abroad?",
        answer: "Absolutely! Brightie can provide detailed comparisons between different study destinations based on factors such as education quality, university rankings, tuition fees, cost of living, work opportunities during and after studies, visa processes, immigration pathways, language requirements, cultural environment, and climate. Simply ask for a comparison of specific countries you're interested in, or ask Brightie to recommend countries that excel in your field of study or match specific criteria that are important to you."
    },
    {
        question: "Will Brightie write my personal statement or application essays?",
        answer: "Brightie can provide guidance, suggestions, and feedback on your personal statements and essays, but cannot write them for you. This is both for ethical reasons and because authentic personal statements should reflect your unique voice, experiences, and aspirations. Brightie can help you understand what admissions committees look for, suggest effective structures, review your drafts for clarity and coherence, and provide feedback on how to improve your essays. The assistant can also help brainstorm ideas for content based on your background and goals."
    },
    {
        question: "How can Brightie assist with scholarship applications?",
        answer: "Brightie can provide comprehensive support for scholarship applications in multiple ways: identifying scholarship opportunities matching your profile and eligibility criteria; explaining application requirements and deadlines; suggesting strategies to strengthen your application; providing guidance on writing compelling scholarship essays; helping you prepare for scholarship interviews; and explaining how to highlight your achievements effectively. Brightie can also explain different types of scholarships (merit-based, need-based, country-specific, etc.) and guide you through the entire application process step by step."
    },
    {
        question: "Can Brightie help with visa applications and requirements?",
        answer: "Yes, Brightie can provide general guidance about student visa requirements, application processes, necessary documentation, and timelines for different countries. The assistant can explain typical student visa requirements, document checklists, application fees, processing times, and interview preparation tips. However, since visa regulations can change and may vary based on your citizenship, always verify this information with the official embassy or consulate website of your destination country. For complex immigration matters, we recommend consulting with qualified immigration advisors."
    },
    {
        question: "Is my conversation with Brightie private and secure?",
        answer: "Yes, your conversations with Brightie are private and handled according to our strict data protection policies. We don't share your specific queries with third parties or universities without your explicit consent. Your conversations are encrypted and stored securely. We may use anonymized data to improve our service and AI capabilities, but this never includes personally identifiable information. You can request to delete your conversation history at any time through your account settings. For more details, please refer to our Privacy Policy."
    },
    {
        question: "How does Brightie stay updated with the latest information?",
        answer: "Brightie is regularly updated with the latest information about universities, admission requirements, scholarship opportunities, visa regulations, and other relevant data. Our team of education experts continuously reviews and updates the information database that Brightie uses. Additionally, the AI system is trained to prioritize more recent information when there are changes in requirements or processes. However, because policies and requirements can change rapidly, we still recommend verifying time-sensitive or critical information through official channels."
    },
    {
        question: "Can Brightie help with test preparation for IELTS, TOEFL, GRE, etc.?",
        answer: "While Brightie isn't a dedicated test preparation tool, it can provide valuable guidance on preparing for standardized tests. This includes explaining test formats and sections, sharing effective study strategies, recommending study resources and practice materials, providing sample questions and explanations, suggesting study schedules based on your timeline, and explaining scoring systems. For in-depth test preparation, we recommend complementing Brightie's advice with dedicated test prep services, which we also offer through BrightPath's test preparation programs."
    },
    {
        question: "What should I do if Brightie can't answer my specific question?",
        answer: "If Brightie cannot provide a satisfactory answer to your specific question, you have several options: you can try rephrasing your question to be more specific; you can schedule a consultation with our human counselors who specialize in various aspects of study abroad processes; you can email your query to our support team at support@brightpath.edu; or you can check our resource library for detailed guides and articles. For highly specialized or unique situations, we recommend booking a one-on-one session with our expert counselors who can provide personalized advice."
    },
    {
        question: "Can Brightie help me with post-graduation opportunities and work permits?",
        answer: "Yes, Brightie can provide information about post-graduation work opportunities in different countries, including details about post-study work visas, typical job markets for international graduates, average starting salaries in different fields, networking opportunities, and application processes for work permits. The assistant can explain country-specific policies regarding international graduates, such as the Optional Practical Training (OPT) in the USA, the Post-Study Work visa in the UK, or similar programs in Canada, Australia, and other popular study destinations. Brightie can also discuss general career prospects in different fields and countries based on current trends."
    },
    {
        question: "How can I save my conversation with Brightie for future reference?",
        answer: "You can save your conversation with Brightie in several ways. If you're a registered user, your conversations are automatically saved in your account and can be accessed anytime by logging in. You can also download your conversation history as a PDF or text file by clicking the 'Download' button in the chat interface. Additionally, you can email the conversation to yourself directly from the platform by using the 'Share' button. For specific information you want to reference quickly in the future, we recommend creating bookmarks or notes in your account profile."
    }
]

export default function FAQ() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                    >
                        <AccordionItem value={`item-${index}`} className="border border-purple-100 rounded-lg mb-4 overflow-hidden shadow-sm">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-purple-50 data-[state=open]:bg-purple-50 group">
                                <span className="text-left font-medium text-gray-900 group-hover:text-purple-700 transition-colors cursor-pointer">
                                    {item.question}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 pt-2 bg-purple-50/50 text-gray-700">
                                <p>{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                ))}
            </Accordion>
        </div>
    );
}