export const ContactFormSchema = {
    title: "Contact Form",
    description: "Send us your message!",
    type: "object",
    properties: {
        name: {
            type: "string",
            title: "Full Name",
            placeholder: "Your full name"
        },
        email: {
            type: "string",
            title: "Email",
            placeholder: "Your email",
            format: "email",
            errorMessage: "Invalid email address"
        },
        message: {
            type: "string",
            title: "Message",
            placeholder: "Write your message here....",
            multiline: true
        }
    },
    required: ["name", "email", "message"]
};