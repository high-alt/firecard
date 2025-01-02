'use client'
import { Checkbox, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import { Field, Formik } from 'formik'
import React, { FormEvent, Fragment, useCallback, useMemo, useState } from 'react'
import Button from './button';
import { createForm, getForm, useQ } from 'app/api'
import { addressFormConfig } from 'utils/forms'
import { FormElement, FormFieldTypeOld, Form } from 'utils/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  field: FormElement
}

export const FormField: React.FC<Props> = ({field, ...props}:Props) => {
  const maxValues = useMemo(() => typeof field.maxValues === 'number' && field.maxValues >= 0 ? field.maxValues : 1, [ field.maxValues ])
  const linear = useMemo(() => [ 'date', 'datetime', 'email', 'number', 'textfield', 'textarea', 'tel', 'time' ].includes(field.type) || (maxValues === 1 && field.type === 'select'), [ maxValues, field.type ])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
    // onChange(field.name, e.target.value)
  }

  switch (field.type) {
    case 'select':
      return (
        <div className='w-full space-y-2 group'>
          <InputLabel className='group-focus-within:text-black' htmlFor={field.id}>{field.title}</InputLabel>
          <select {...field}
            onChange={handleChange}
            id={field.id}
            name={field.name}
            defaultValue={field.value}>
            {field?.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </select>
        </div>)
    case 'switch':
      return <div>
        <label htmlFor={field.name}>{field.title}</label>
        <Switch {...field} onChange={()=> {}} />
      </div>
    case 'checkbox':
      return <div>
        <FormControlLabel control={<Checkbox {...field} />} label={field.title}/>
      </div>
      case 'email':
      case 'text':
      case 'textfield':
      case 'number':
      default:
        return (<Fragment key={ i }>
          <div className='flex flex-col w-full'>
            <div className='flex'>
              <TextField
                id={ id }
                name={ id }
                variant='outlined'
                className='w-full'
                select={ !!props.options }
                multiline={ props.type === 'textarea' }
                minRows={ 3 }
                label={ label }
                value={ v || undefined }
                defaultValue={props.value?.[i]}
                onKeyDown={ props.type === 'number' ? e => { if (e.key.length === 1 && isNaN(e.key as any)) e.preventDefault() } : undefined }
                onChange={ e => changeValueAt(i, e.target.value || null) }
                inputProps={{
                  type: [ 'email', 'number', 'tel' ].includes(props.type) ? props.type : undefined,
                  maxLength: props.maxSize || undefined,
                  ...(props.extras?.__typename === 'FormExtrasNumber' && {
                    min: field.extras?.min,
                    max: field.extras?.,
                    step: props.extras?.step,
                  }),
                }}
                InputProps={ adornments(props) }
                { ...helperProps }
                helperText={ helperText }
              >
                { !!props.options && <MenuItem value='' className='italic'>None</MenuItem> }
                { props.options?.map((opt, i) => <MenuItem key={ i } value={ opt.value }>{ opt.text }</MenuItem>) }
              </TextField>
  
              { moreBtn(a.length, i) }
            </div>
            {!!descText && <FormHelperText>{ descText }</FormHelperText>}
          </div>
        </Fragment>
  )
  }
}

export type DynamicFormProps = {
  fields?: FormElement[]
}

export const DynamicForm = ({fields}: DynamicFormProps) => {

  type InitFormData = {
    [key: string]: any;
  }

  const [formFields, setFormFields] = useState<FormElement[]>()
  const [form, setForm] = useState<Form>()

  const {data} = useQuery({queryFn: getForm, queryKey: ["asD"]})

  const handleFieldChange = (fieldName: string, value: any) => {
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(!form) return
    const res = await createForm(form)
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      {formFields && formFields.map((field, index) => (
        <React.Fragment key={index}>
          {<FormField field={field} />}
        </React.Fragment>
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}