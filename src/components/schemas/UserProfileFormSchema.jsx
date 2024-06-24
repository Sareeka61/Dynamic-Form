export const UserProfileFormSchema = {
    title:"User Profile Form",
    description:"Please fill in your details",
    type:"object",
    properties:{
        firstName:{
            type:"string",
            title:"First Name",
        },
        lastName: {
            type:"string",
            title:"Last Name",
        },
        phone: {
            type:"string",
            title:"Phone Number",
        },
        email: {
            type:"string",
            title:"Email Address",
        },
        country: {
            type:"string",
            title:"Country"
        },
        state: {
            type:"string",
            title:"Province/State",
        },
        city: {
            type:"string",
            title:"City",
        },
        bio:{
            type:"string",
            title:"Bio",
            maxLength:500,
            multiline: true
        }
    },
    required: ["firstName", "lastName", "email", "phone", "country", "city", "state",]
};