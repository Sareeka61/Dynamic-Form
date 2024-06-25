import React, { useState } from "react";
import { FormField } from "./FormField";
import { ContactFormSchema } from "./schemas/ContactFormSchema";
import { JobApplicationSchema } from "./schemas/JobApplicationSchema";
import { UserProfileFormSchema } from "./schemas/UserProfileFormSchema";
import "../cssfiles/form.css";

const schemas = {
  contact: ContactFormSchema,
  jobApplication: JobApplicationSchema,
  userProfile: UserProfileFormSchema,
};

export const Form = () => {
  const [formData, setFormData] = useState({});
  const [selectedFormType, setSelectedFormType] = useState("jobApplication");

  const fieldSchema = schemas[selectedFormType];

  const handleSubmit = (e) => {
    if (Object.keys(formData).length === 0) {
      alert("Form can not be empty!");
    }
    e.preventDefault();

    const missingFields = fieldSchema.required.some(
      (field) => !formData[field]
    );

    if (missingFields) {
      alert("Please fill in all required fields!");
      return;
    }

    console.log("Form Data Submitted:", formData);
    setFormData({});
  };

  const handleFieldChange = (fieldKey, value) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  const handleFormTypeChange = (formType) => {
    setSelectedFormType(formType);
    setFormData({});
  };

  return (
    <div className="form-container">
      <div className="form-type-buttons">
        <button onClick={() => handleFormTypeChange("contact")}>Contact</button>
        <button onClick={() => handleFormTypeChange("jobApplication")}>
          Job Application
        </button>
        <button onClick={() => handleFormTypeChange("userProfile")}>
          User Profile
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>{fieldSchema.title}</h2>
        <p>{fieldSchema.description}</p>
        {Object.entries(fieldSchema.properties).map(([key, fieldSchema]) => (
          <FormField
            key={key}
            fieldKey={key}
            fieldSchema={fieldSchema}
            value={formData[key] || ""}
            onChange={handleFieldChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
