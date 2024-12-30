import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

type Props = TextFieldProps & {
	header?: string
}

export const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
	return (
		<div className="flex flex-col w-full space-y-2 group ">
			<label
				htmlFor={props.header}
				className="text-sm text-black-light group-focus-within:text-primary"
			>
				{props.header}
			</label>
			<TextField ref={ref} {...props} />
		</div>
	)
})
