import React, { useState, useEffect, useRef } from "react";
import '../cssfiles/formfield.css';

export const FormField = ({ fieldKey, fieldSchema, value, onChange, required }) => {
  const errorRef = useRef(null);  // Creating reference for error display
  const [fileError, setFileError] = useState("");  // Managing file errors
  const [touched, setTouched] = useState(false);  // Tracking if the field has been touched

  // Running validation when value changes
  useEffect(() => {
    if (fieldSchema.validation) {
      validateField(value);  // Validating field after change
    }
  }, [value]);

  // Handling changes for text, textarea, or select inputs
  const handleChange = (e) => {
    const { value } = e.target;
    setTouched(true);  // Marking the field as touched if interaction is done
    onChange(fieldKey, value);
    if (fieldSchema.validation) {
      validateField(value);
    }
  };

  // Handling file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTouched(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(fieldKey, reader.result);
    };
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError("File format should be PDF");
      } else {
        setFileError("");
        reader.readAsDataURL(file);
      }
    }
  };

  // Validating the input field
  const validateField = (value) => {
    if (!fieldSchema.validation) return;

    const { regex, errorMessage } = fieldSchema.validation;
    const pattern = new RegExp(regex);

    if (required && !value) {
      showError("This field is required");  // Showing error for empty required field
      return;
    }

    if (regex && !pattern.test(value)) {
      showError(errorMessage || "Invalid format");
      return;
    }

    clearError();
  };

  // Displaying validation error message
  const showError = (message) => {
    if (touched) {
      errorRef.current.style.display = "block";
      errorRef.current.innerText = message;
    }
  };

  // Clearing validation error
  const clearError = () => {
    errorRef.current.style.display = "none";
    errorRef.current.innerText = "";
  };

  // Rendering the form field based on its type
  switch (fieldSchema.type) {
    case "string":
      if (fieldSchema.enum) {
        // Rendering select dropdown for enum options
        return (
          <div>
            <label>{fieldSchema.title}</label>
            <select
              name={fieldKey}
              value={value}
              onChange={handleChange}
              required={required}
            >
              {fieldSchema.enum.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p ref={errorRef} style={{ color: "red", display: "none" }}></p>
          </div>
        );
      } else if (fieldSchema.multiline) {
        // Rendering textarea for multiline input
        return (
          <div>
            <label>{fieldSchema.title}</label>
            <textarea
              name={fieldKey}
              value={value}
              onChange={handleChange}
              required={required}
              placeholder={fieldSchema.placeholder}
            />
            <p ref={errorRef} style={{ color: "red", display: "none" }}></p>
          </div>
        );
      } else if (fieldSchema.format === "data-url") {
        // Rendering file input for PDF uploads
        return (
          <div>
            <label>{fieldSchema.title}</label>
            <input
              type="file"
              name={fieldKey}
              accept="application/pdf"
              onChange={handleFileChange}
              required={required}
            />
            {fileError && <p className="field-error">{fileError}</p>}
          </div>
        );
      } else {
        // Rendering basic text input field
        return (
          <div>
            <label>{fieldSchema.title}</label>
            <input
              type="text"
              name={fieldKey}
              placeholder={fieldSchema.placeholder}
              value={value}
              onChange={handleChange}
              required={required}
            />
            <p ref={errorRef} style={{ color: "red", display: "none" }}></p>
          </div>
        );
      }

    default:
      return null;
  }
};
