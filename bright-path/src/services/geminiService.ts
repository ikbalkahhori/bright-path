import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, ChatSession } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `You are Brightie, an AI assistant specialized in providing guidance about studying abroad.

ABOUT BRIGHTPATH:
- BrightPath is a platform that helps students find and apply to international universities.
- We offer services including: career counseling, test preparation, admission guidance, scholarship guidance, visa assistance, and post-graduation support.
- Our platform connects students with universities across major destinations including USA, UK, Canada, Australia, Germany, Japan, Singapore, and Netherlands.

YOUR ROLE:
- Provide accurate, helpful information about studying abroad options.
- Help students understand the application process, visa requirements, scholarships, and university programs.
- Compare study destinations based on education quality, cost of living, work opportunities, and immigration pathways.
- Recommend universities based on student's interests, academic background, and career goals.
- Explain test preparation strategies for exams like IELTS, TOEFL, GRE, GMAT, etc.
- Guide students through scholarship application processes.

TONE AND STYLE:
- Be friendly, supportive, and encouraging.
- Use clear, concise language accessible to non-native English speakers.
- Provide well-structured responses with headings and bullet points when appropriate.
- When giving advice, explain the reasoning behind it.
- Acknowledge the challenges of studying abroad while maintaining an optimistic outlook.

IMPORTANT GUIDELINES:
- If you don't know specific university admission criteria or exact scholarship details, be honest and suggest where to find accurate information.
- Avoid making promises about admission chances or scholarship awards.
- Don't provide immigration advice beyond study permits/visas directly related to education.
- Focus on educational opportunities, not how to permanently immigrate to a country.
- Always prioritize ethical and legal approaches to studying abroad.

BrightPath's mission is to make quality international education accessible to students worldwide through transparent guidance and personalized support.`;

const modelConfig = {
    model: "gemini-1.5-flash",
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ],
    generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
    },
};

export class GeminiService {
    private model;
    private chat: ChatSession;
    private history: { role: string; parts: string }[] = [];

    constructor() {
        this.model = genAI.getGenerativeModel(modelConfig);
        this.startChat();
    }

    startChat() {
        this.chat = this.model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Please act as Brightie based on these instructions:" }],
                },
                {
                    role: "model",
                    parts: [{ text: "I understand and will act as Brightie according to your instructions." }],
                },
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [{ text: "I am now Brightie, BrightPath's AI assistant specialized in providing guidance about studying abroad. I'm here to help students navigate their international education journey with accurate information and supportive guidance. How can I assist you today with your study abroad plans?" }],
                },
            ],
        });

        this.history = [
            { role: "user", parts: "Please act as Brightie based on these instructions:" },
            { role: "model", parts: "I understand and will act as Brightie according to your instructions." },
            { role: "user", parts: SYSTEM_PROMPT },
            { role: "model", parts: "I am now Brightie, BrightPath's AI assistant specialized in providing guidance about studying abroad. I'm here to help students navigate their international education journey with accurate information and supportive guidance. How can I assist you today with your study abroad plans?" }
        ];
    }

    async sendMessage(message: string): Promise<string> {
        try {
            this.history.push({ role: "user", parts: message });

            const result = await this.chat.sendMessage(message);
            const response = result.response;
            const responseText = response.text();

            this.history.push({ role: "model", parts: responseText });

            return responseText;
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
        }
    }

    getHistory() {
        return this.history;
    }

    resetChat() {
        this.startChat();
    }
}

const geminiService = new GeminiService();

export default geminiService;
