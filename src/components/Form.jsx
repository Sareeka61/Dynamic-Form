import {useState, React} from 'react'
import { FormField } from './FormField'
import { ContactFormSchema } from './schemas/ContactFormSchema';
import { JobApplicationSchema } from './schemas/JobApplicationSchema';
import { UserProfileFormSchema } from './schemas/UserProfileFormSchema';
import '../cssfiles/form.css'

const schemas = {
  contact: ContactFormSchema,
  jobApplication: JobApplicationSchema,
  userProfile: UserProfileFormSchema, 
}

export const Form = ({formType='contact'}) => {

  const [formData, setFormData] = useState({});
  const fieldSchema = schemas[formType]

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data Submitted:', formData)

    const emailField = fieldSchema.properties.email;
    
    if (emailField && emailField.type === 'string' && !validateEmail(formData.email)) {
      alert("Invalid Email Address!");
      return;
    }

    console.log('Form Data Submitted:', formData);
    setFormData({});
    setErrors({});
  }

  const handleFieldChange = (fieldKey, value) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  return (
    <>
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2>{fieldSchema.title}</h2>
      <p>{fieldSchema.description}</p>
      {Object.entries(fieldSchema.properties).map(([key, fieldSchema])=> (
        <FormField
        key={key}
        fieldKey={key}
        fieldSchema={fieldSchema}
        value={formData[key] || ''}
        onChange={handleFieldChange}/>
      ))}

      <button type="submit">Submit</button>
    </form>
    </div>
    </>
  );
};