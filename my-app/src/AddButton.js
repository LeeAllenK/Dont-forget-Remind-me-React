import React from 'react'

export const AddButton = ({onClick , children ,  style}) => {

	return (
		<button

		className='addButton'
		onClick={onClick}
		style={style}
		
		>
		{children}
			Add
		</button>
	)
}