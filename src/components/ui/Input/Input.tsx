import React from 'react'
// import { useAppDispatch } from '../../../redux/store/store'

import { InputProps } from './InputTypes'

import './Input.scss'

const Input: React.FC<InputProps> = ({ amount, setAmount }) => {
	// const dispatch = useAppDispatch()

	const setAmountFunc = (e: number) => {
		if (String(e).includes('.') && String(e).length > 7) return

		setAmount(e)
	}

	return (
		<>
			<input
				type='number'
				className='input'
				value={amount || ''}
				onChange={e => setAmountFunc(+e.target.value)}
				// onFocus={e => +e.target.select()}
			/>
		</>
	)
}

export { Input }
