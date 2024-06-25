export const JobApplicationSchema = {
    title:"Job Application Form",
    description:"Fill your authenticate details to apply for the job.",
    type:"object",
    properties: {
        firstName: {
            type:"string",
            title:"FirstName"
        },
        lastName: {
            type:"string",
            title:"LastName"
        },
        email: {
            type:"string",
            title:"Email Address"
        },
        phone: {
            type:"string",
            title:"Phone Number"
        },
        country: {
            type:"string",
            title:"Country"
        },
        tempaddress: {
            type:"string",
            title:"Temporary Address"
        },
        permaddress: {
            type: "string",
            title: "Permanent Address"
        },
        education:{
            type:"string",
            title:"Education Level",
            enum:["Higher Secondary Level", "Bachelor's Degree", "Master's Degree"]
        },
        experience:{
            type:"string",
            title:"Years of Experience"
        },
        resume:{
            type:"string",
            format:"data-url",
            title:"Resume"
        },
        coverLetter:{
            type:"string",
            format:"data-url",
            title:"Cover Letter"
        },
        portfolio:{
            type:"string",
            title:"Portfolio Link"
        },
        linkedin:{
            type:"string",
            title:"LinkedIn Profile URL"
        },
        github:{
            type:"string",
            title:"GitHub Profile URL"
        },
        additionalInfo:{
            type:"string",
            title:"Additional Info",
            maxLength: 500
        }
    },
    required:["firstName", "lastName", "email", "phone", "country", "tempaddress", "permaddress","education", "experience", "resume", "coverLetter","github", "linkedin"]
};