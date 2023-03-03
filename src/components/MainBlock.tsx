import React from 'react'

// import { useAppDispatch, useAppSelector } from '../redux/store/store'

import { Select } from '../components/ui/Select/Select'
import { Input } from '../components/ui/Input/Input'

import { MainBlockProps } from '../types/MainBlockTypes'

const MainBlock: React.FC<MainBlockProps> = ({ currentArray }) => {
	// const dispatch = useAppDispatch()
	// const amountFrom = useAppSelector(state => state.amount.amountFrom)
	// const amountTo = useAppSelector(state => state.amount.amountTo)
	const [amountFrom, setAmountFrom] = React.useState<number>(0)
	const [amountTo, setAmountTo] = React.useState<number>(0)
	const [selectedFrom, setSelectedFrom] = React.useState('USD')
	const [selectedFromText, setSelectedFromText] = React.useState('Долар США')
	const [selectedTo, setSelectedTo] = React.useState('EUR')
	const [selectedToText, setSelectedToText] = React.useState('Євро')
	const [inputHandler, setInputHandler] = React.useState(true)

	// Converter functional
	const priceFrom =
		currentArray &&
		currentArray
			.find(cur => cur.cc === (inputHandler ? selectedTo : selectedFrom))
			?.rate?.toFixed(2)
	const priceTo =
		currentArray &&
		currentArray
			.find(cur => cur.cc === (inputHandler ? selectedFrom : selectedTo))
			?.rate?.toFixed(2)

	const changeAmountFrom = (value: number) => {
		console.log(value, 'FROM')
		const price = !!priceFrom && value / +priceFrom
		const result = !!priceTo && (+price * +priceTo).toFixed(5)
		setAmountTo(+result)
		setAmountFrom(value)
	}

	const changeAmountTo = (value: number) => {
		console.log(value, 'TO')
		const result =
			priceFrom !== undefined &&
			priceTo !== undefined &&
			((+priceFrom / +priceTo) * value).toFixed(5)
		setAmountFrom(+result)
		setAmountTo(value)
	}

	React.useEffect(() => {
		changeAmountTo(amountTo)
	}, [selectedFrom, amountFrom])

	React.useEffect(() => {
		changeAmountFrom(amountFrom)
	}, [selectedTo, amountTo])

	React.useEffect(() => {
		setInputHandler(true)
		setAmountTo(amountTo)
	}, [amountFrom])
	React.useEffect(() => {
		setInputHandler(false)
		setAmountFrom(amountFrom)
	}, [amountTo])

	return (
		<div className='home__main-blocks'>
			<div className='home__block'>
				<Select
					currencyArray={currentArray}
					selected={selectedFrom}
					selectedText={selectedFromText}
					setSelected={setSelectedFrom}
					setSelectedText={setSelectedFromText}
				/>
				<Input
					amount={inputHandler ? amountFrom : amountTo}
					setAmount={inputHandler ? changeAmountFrom : changeAmountTo}
				/>
			</div>
			<div className='home__block'>
				<Select
					currencyArray={currentArray}
					selected={selectedTo}
					selectedText={selectedToText}
					setSelected={setSelectedTo}
					setSelectedText={setSelectedToText}
				/>
				<Input
					amount={!inputHandler ? amountFrom : amountTo}
					setAmount={!inputHandler ? changeAmountFrom : changeAmountTo}
				/>
			</div>
		</div>
	)
}

export { MainBlock }
