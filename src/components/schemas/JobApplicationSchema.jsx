export const JobApplicationSchema = {
    title: "Job Application Form",
    description: "Fill your authenticate details to apply for the job.",
    type: "object",
    properties: {
        firstName: {
            type: "string",
            title: "FirstName",
            placeholder: "Enter your first name",
            maxLength: 30,
            minLength: 2
        },
        lastName: {
            type: "string",
            title: "LastName",
            placeholder: "Enter your last name",
            maxLength: 30,
            minLength: 2
        },
        email: {
            type: "string",
            title: "Email Address",
            placeholder: "Enter your email address",
            format: "email",
            errorMessage: "Invalid email address"
        },
        phone: {
            type: "string",
            title: "Phone Number",
            placeholder: "Enter your phone number",
            pattern: "^\\d+$",
            errorMessage: "Phone number must contain only digits"
        },
        country: {
            type: "string",
            title: "Country",
            placeholder: "Enter your country"
        },
        tempaddress: {
            type: "string",
            title: "Temporary Address",
            placeholder: "Enter your temporary address"
        },
        permaddress: {
            type: "string",
            title: "Permanent Address",
            placeholder: "Enter your permanent address"
        },
        education: {
            type: "string",
            title: "Education Level",
            enum: ["Higher Secondary Level", "Bachelor's Degree", "Master's Degree"],
            placeholder: "Select your education level"
        },
        experience: {
            type: "string",
            title: "Years of Experience",
            placeholder: "Enter your years of experience",
            minLength: 0,
            maxLength: 50
        },
        resume: {
            type: "string",
            format: "data-url",
            title: "Resume",
            placeholder: "Upload your resume",
            accept: ".pdf,.doc,.docx"
        },
        coverLetter: {
            type: "string",
            format: "data-url",
            title: "Cover Letter",
            placeholder: "Upload your cover letter",
            accept: ".pdf,.doc,.docx"
        },
        portfolio: {
            type: "string",
            format: "uri",
            title: "Portfolio Link",
            placeholder: "Enter your portfolio link"
        },
        linkedin: {
            type: "string",
            format: "uri",
            title: "LinkedIn Profile URL",
            placeholder: "Enter your LinkedIn profile URL"
        },
        github: {
            type: "string",
            format: "uri",
            title: "GitHub Profile URL",
            placeholder: "Enter your GitHub profile URL"
        },
        additionalInfo: {
            type: "string",
            title: "Additional Info",
            maxLength: 500,
            placeholder: "Enter any additional information (max 500 characters)"
        },
        jobType: {
            type: "string",
            title: "Preferred Job Type",
            enum: ["Full-time", "Part-time", "Freelance"],
            placeholder: "Select your preferred job type"
        },
        agreeToTerms: {
            type: "boolean",
            title: "Agree to Terms and Conditions",
            description: "I agree to the terms and conditions of the job application.",
            default: false
        }
    },
    required: [
        "firstName", "lastName", "email", "phone", "country",
        "tempaddress", "permaddress", "education", "experience",
        "resume", "coverLetter", "github", "linkedin", "agreeToTerms"
    ]
};
