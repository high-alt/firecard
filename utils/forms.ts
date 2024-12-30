import { FormFieldTypeOld } from "./types";



export const addressFormConfig: FormFieldTypeOld[] = [
  {
    type: 'text',
    name: 'streetAddress',
    label: 'Street Address',
    placeholder: '123 Main St',
    required: true,
    validation: {
      required: 'Street Address is required',
      minLength: {
        value: 5,
        message: 'Street Address must be at least 5 characters',
      },
      maxLength: {
        value: 50,
        message: 'Street Address cannot exceed 50 characters',
      },
    },
    value:""
  },
  {
    type: 'text',
    name: 'city',
    label: 'City',
    placeholder: 'New York',
    required: true,
    validation: {
      required: 'City is required',
      maxLength: {
        value: 30,
        message: 'City name cannot exceed 30 characters',
      },
    },
    value:""
  },
  {
    type: 'select',
    name: 'state',
    label: 'State',
    placeholder: 'Select State',
    required: true,
    options: [
      { value: 'ny', label: 'New York' },
      { value: 'ca', label: 'California' },
      // Add more state options as needed
    ],
    validation: {
      required: 'State is required',
    },
    value:""
  },
  {
    type: 'number',
    name: 'postalCode',
    label: 'Postal Code',
    placeholder: '12345',
    required: true,
    validation: {
      required: 'Postal Code is required',
      pattern: {
        value: /^\d{4}$/,
        message: 'Postal Code must be a 4-digit number',
      },
    },
    value:""
  },
];


export const userDetailsFormConfig: FormFieldTypeOld[] = [
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    placeholder: 'John',
    required: true,
    validation: {
      required: 'First Name is required',
      minLength: {
        value: 2,
        message: 'First Name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'First Name cannot exceed 30 characters',
      },
    },
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Doe',
    required: true,
    validation: {
      required: 'Last Name is required',
      minLength: {
        value: 2,
        message: 'Last Name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Last Name cannot exceed 30 characters',
      },
    },
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'john.doe@example.com',
    required: true,
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
  },
  {
    type: 'select',
    name: 'gender',
    label: 'Gender',
    placeholder: 'Select Gender',
    required: true,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
    validation: {
      required: 'Gender is required',
    },
  },
  {
    type: 'date',
    name: 'birthDate',
    label: 'Date of Birth',
    placeholder: 'Select Date',
    required: true,
    validation: {
      required: 'Date of Birth is required',
    },
  },
];
