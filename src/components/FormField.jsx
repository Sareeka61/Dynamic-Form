import React, { useState, useEffect, useRef } from "react";
import '../cssfiles/formfield.css';

export const FormField = ({ fieldKey, fieldSchema, value, onChange, required }) => {
  const emailErrorRef = useRef(null);
  const phoneErrorRef = useRef(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (fieldKey === "email") {
      validateEmail(value);
    } else if (fieldKey === "phone") {
      validatePhone(value);
    }
  }, [value]);

  // Handling change in the field

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(fieldKey, value);

    if (fieldKey === "email") {
      validateEmail(value);
    } else if (fieldKey === "phone") {
      validatePhone(value);
    }
  };

  // Handing change in file

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(fieldKey, reader.result);
    };
    if (file) {
      // Accepting only pdf files
      if (file.type !== "application/pdf") {
        setFileError("File format should be PDF");
      } else {
        setFileError("");
        reader.readAsDataURL(file);
      }
    }
  };

  // Validating email
  const validateEmail = (email) => {
    if (emailErrorRef.current) {
      if (email === "") {
        emailErrorRef.current.style.display = "none";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          emailErrorRef.current.style.display = "block";
        } else {
          emailErrorRef.current.style.display = "none";
        }
      }
    }
  };

  // Validate the entered phone number
  const validatePhone = (phone) => {
    if (phoneErrorRef.current) {
      if (phone === "") {
        phoneErrorRef.current.style.display = "none";
      } else {
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) {
          phoneErrorRef.current.style.display = "block";
        } else {
          phoneErrorRef.current.style.display = "none";
        }
      }
    }
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
      } else if (fieldSchema.format === "data-url") {
        // Render file input for data-url format
        return (
          <div>
            <label>{fieldSchema.title}</label>
            <input
              type="file"
              name={fieldKey}
              accept="application/pdf"
              onChange={handleFileChange}
              required={fieldSchema.required}
            />
            {fileError && <p className="field-error">{fileError}</p>}
          </div>
        );
      } else {
        return (
          // Renders default text field
          <div>
            <label>{fieldSchema.title}</label>
            <input
              type={fieldKey === "email" ? "email" : fieldKey === "phone" ? "text" : "text"}
              name={fieldKey}
              placeholder={fieldSchema.placeholder}
              value={value}
              onChange={handleChange}
              required={fieldSchema.required}
              pattern={fieldKey === "phone" ? "\\d*" : undefined}
            />
            {fieldKey === "email" && <p ref={emailErrorRef} style={{ color: "red", display: "none" }}>Invalid email address</p>}
            {fieldKey === "phone" && <p ref={phoneErrorRef} style={{ color: "red", display: "none" }}>Phone number must contain only digits</p>}
          </div>
        );
      }

    default:
      return null;
  }
};
