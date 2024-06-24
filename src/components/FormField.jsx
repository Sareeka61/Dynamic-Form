import React from "react";

export const FormField = ({ fieldKey, fieldSchema, value, onChange, required }) => {
  const handleChange = (e) => {
    const { type, checked, value } = e.target;
    onChange(fieldKey, type === "checkbox" ? checked : value);
  };

  switch (fieldSchema.type) {
    case "string":
      if (fieldSchema.enum) {
        // Render a select dropdown for enums
        return (
          <div>
            <label>{fieldSchema.title}</label>
            <select
              name={fieldKey}
              value={value}
              onChange={handleChange}
              required={fieldSchema.required}
            >
              {fieldSchema.enum.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      } else if (fieldSchema.multiline) {
        // Render multiline text fields
        return (
          <div>
            <label>{fieldSchema.title}</label>
            <textarea
              name={fieldKey}
              value={value}
              onChange={handleChange}
              required={fieldSchema.required}
              placeholder={fieldSchema.placeholder}
            />
          </div>
        );
      } else {
      return (
        // Renders default text field
        <div>
          <label>{fieldSchema.title}</label>
          <input
            type="text"
            name={fieldKey}
            placeholder={fieldSchema.placeholder}
            value={value}
            onChange={handleChange}
            required={fieldSchema.required}
          />
        </div>
      );
      }

      default:
        return null;
  }
};
