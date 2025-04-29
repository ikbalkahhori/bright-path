import emailjs from '@emailjs/browser';

interface EmailRequest {
    from: string;
    name: string;
    phone?: string;
    subject: string;
    country?: string;
    message: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
}

class EmailService {
    private serviceId: string;
    private templateId: string;
    private publicKey: string;

    constructor() {
        this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
        this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
        this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

        emailjs.init(this.publicKey);
    }

    async sendEmail(data: EmailRequest): Promise<ApiResponse> {
        try {
            const templateParams = {
                from_name: data.name,
                from_email: data.from,
                phone_number: data.phone || 'Not provided',
                subject: data.subject,
                country: data.country || 'Not specified',
                message: data.message,
            }

            const response = await emailjs.send(this.serviceId, this.templateId, templateParams);

            console.log('EmailJS response:', response);
            return {
                success: true,
                message: 'Email sent successfully'
            }
        } catch (error) {
            console.error('Error sending email with EmailJS:', error);
            throw error;
        }
    }
}

export const emailService = new EmailService();