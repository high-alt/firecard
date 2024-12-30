import { IconButton, Modal as Mdl } from '@mui/material'
import Button from './button'
import { Close } from '@mui/icons-material'

type Props = {
	open: boolean
	onClose: () => void
	children: React.ReactElement | React.ReactElement[]
}

export const Modal = (props: Props) => {
	return (
		<>
			<Mdl
				onClose={(_, reason) => reason === 'backdropClick' && props.onClose()}
				open={!!props.open}
				className="relative"
			>
				<>
					<div className="absolute top-2 right-2">
						<IconButton className="text-white" onClick={props.onClose}>
							<Close className="text-white" />
						</IconButton>
					</div>
					<div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4">
						{props.children}
					</div>
				</>
			</Mdl>
		</>
	)
}
