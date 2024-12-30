import React from 'react'
import { Formik, Form, Field } from 'formik'
import { addressFormConfig, userDetailsFormConfig } from 'utils/forms'
type Props = {}

//On board form: firstname, lastname, email, street address, zip/postal code, city, country or region

export interface onboardForm {
  firstname: string
  lastname: string
  address:{
    street: string
    suburb: string
    zipcode: string
  }
}

export const Onboarder = (props: Props) => {
  const onSubmit = (e: React.FormEvent) =>{

  }
  return (<div>
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        // Handle form submission here
        console.log('Form values:', values);
      }}
    >

      <Form>
        {addressFormConfig.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <Field
              type={field.type}
              name={field.name}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>

  )
}