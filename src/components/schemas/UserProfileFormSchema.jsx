export const UserProfileFormSchema = {
    title: "User Profile Form",
    description: "Please fill in your details",
    type: "object",
    properties: {
        firstName: {
            type: "string",
            title: "First Name",
            placeholder: "Enter your first name"
        },
        lastName: {
            type: "string",
            title: "Last Name",
            placeholder: "Enter your last name"
        },
        phone: {
            type: "string",
            title: "Phone Number",
            placeholder: "Enter your phone number",
            pattern: "^\\d+$",
            errorMessage: "Phone number must contain only digits"
        },
        email: {
            type: "string",
            title: "Email Address",
            placeholder: "Enter your email address",
            format: "email",
            errorMessage: "Invalid email address"
        },
        country: {
            type: "string",
            title: "Country",
            placeholder: "Enter your country"
        },
        state: {
            type: "string",
            title: "Province/State",
            placeholder: "Enter your province/state"
        },
        city: {
            type: "string",
            title: "City",
            placeholder: "Enter your city"
        },
        bio: {
            type: "string",
            title: "Bio",
            maxLength: 500,
            multiline: true,
            placeholder: "Tell us about yourself (max 500 characters)"
        }
    },
    required: ["firstName", "lastName", "email", "phone", "country", "city", "state"]
};
