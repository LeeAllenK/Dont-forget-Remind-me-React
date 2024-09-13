import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const SubmitButton = ({children , style}) => {

	return (

		<button  
		className='submitButton' 
		style={style}	
		>
		<FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
		
		{children}
		{' '}
		Submit
		</button>

	)

}