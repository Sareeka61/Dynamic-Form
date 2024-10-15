import React, { useState, useEffect, useRef } from "react";
import '../cssfiles/formfield.css';

export const FormField = ({ fieldKey, fieldSchema, value, onChange, required }) => {
  const errorRef = useRef(null);
  const [fileError, setFileError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (fieldSchema.validation) {
      validateField(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const { type, checked, value } = e.target;
    setTouched(true);
    const newValue = type === "checkbox" ? checked : value;
    onChange(fieldKey, newValue);
    if (fieldSchema.validation) {
      validateField(newValue);
    }
  };

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

  const validateField = (value) => {
    if (!fieldSchema.validation) return;

    const { regex, errorMessage } = fieldSchema.validation;
    const pattern = new RegExp(regex);

    if (required && !value) {
      showError("This field is required");
      return;
    }

    if (regex && !pattern.test(value)) {
      showError(errorMessage || "Invalid format");
      return;
    }

    clearError();
  };

  const showError = (message) => {
    if (touched) {
      errorRef.current.style.display = "block";
      errorRef.current.innerText = message;
    }
  };

  const clearError = () => {
    errorRef.current.style.display = "none";
    errorRef.current.innerText = "";
  };

  // Rendering the form field based on its type
  switch (fieldSchema.type) {
    case "string":
      if (fieldSchema.enum) {
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

    case "boolean":
      // Checkbox field
      return (
        <div>
          <label>
            <input
              type="checkbox"
              name={fieldKey}
              checked={value || false}
              onChange={handleChange}
              required={required}
            />
            {fieldSchema.title}
          </label>
        </div>
      );

    case "radio":
      // Radio button group
      return (
        <div>
          <label>{fieldSchema.title}</label>
          {fieldSchema.enum.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name={fieldKey}
                  value={option}
                  checked={value === option}
                  onChange={handleChange}
                  required={required}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};
