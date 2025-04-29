import { useState } from "react";
import { emailService } from "@/services/emailService";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    country: string;
    message: string;
}

export const useEmailSubmit = () => {
    const initialFormState: FormData = {
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        country: "",
        message: ""
    }

    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        setSubmitting(true);

        try {
            await emailService.sendEmail({
                from: formData.email,
                name: formData.fullName,
                phone: formData.phone,
                subject: formData.subject || "General Inquiry",
                country: formData.country,
                message: formData.message
            });

            setSuccessMessage("Thank you for contacting us! Your message has been sent successfully. We'll get back to you soon.");

            setFormData(initialFormState);
        } catch (error) {
            console.error("Error sending email:", error);
            setErrorMessage("There was an error sending your message. Please try again or contact us directly via email or phone.");
        } finally {
            setSubmitting(false);
        }
    }

    const resetForm = () => {
        setFormData(initialFormState);
        setSuccessMessage("");
        setErrorMessage("");
    }

    return {
        formData,
        handleChange,
        handleSelectChange,
        handleSubmit,
        submitting,
        successMessage,
        errorMessage,
        resetForm
    }
}