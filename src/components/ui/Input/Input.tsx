import React from 'react'

import { InputProps } from './InputTypes'

import './Input.scss'

const Input: React.FC<InputProps> = ({ amount, setAmount }) => {
	const setAmountFunc = (e: number) => {
		if (String(e).includes('.') && String(e).length > 7) return
		setAmount(e)
	}

	return (
		<div className='input__wrapper'>
			<input
				type='number'
				className='input'
				value={amount || ''}
				onChange={e => setAmountFunc(+e.target.value)}
			/>
			<span
				onClick={() => setAmount(0)}
				className={amount > 0 ? 'input__clear input__clear-active' : 'input__clear'}></span>
		</div>
	)
}

export { Input }
