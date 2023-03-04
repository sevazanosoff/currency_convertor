import React from 'react'

import { Select } from '../components/ui/Select/Select'
import { Input } from '../components/ui/Input/Input'

import { MainBlockProps } from '../types/MainBlockTypes'

import '../scss/components/MainBlock.scss'

const MainBlock: React.FC<MainBlockProps> = ({ currentArray }) => {
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
			?.rate?.toFixed(3)
	const priceTo =
		currentArray &&
		currentArray
			.find(cur => cur.cc === (inputHandler ? selectedFrom : selectedTo))
			?.rate?.toFixed(3)

	const changeAmountFrom = (value: number) => {
		const price = !!priceFrom && value / +priceFrom
		const result = !!priceTo && (+price * +priceTo).toFixed(5)
		setAmountTo(+result)
		setAmountFrom(value)
	}

	const changeAmountTo = (value: number) => {
		const result =
			priceFrom !== undefined &&
			priceTo !== undefined &&
			((+priceFrom / +priceTo) * value).toFixed(5)
		setAmountFrom(+result)
		setAmountTo(value)
	}

	const changeSelectedFrom = (cc: string) => {
		const text = currentArray?.find(cur => cur.cc === cc)?.txt
		text && setSelectedFromText(text)
		setSelectedFrom(cc)
	}

	const changeSelectedTo = (cc: string) => {
		const text = currentArray?.find(cur => cur.cc === cc)?.txt
		text && setSelectedToText(text)
		setSelectedTo(cc)
	}

	React.useEffect(() => {
		changeAmountTo(amountTo)
	}, [selectedFrom, amountFrom])

	React.useEffect(() => {
		changeAmountFrom(amountFrom)
	}, [selectedTo, amountTo])

	// Try fix nums bug(probably work)
	React.useEffect(() => {
		setInputHandler(true)
		setAmountTo(amountTo)
	}, [amountFrom])
	React.useEffect(() => {
		setInputHandler(false)
		setAmountFrom(amountFrom)
	}, [amountTo])
	React.useEffect(() => {
		setAmountFrom(0)
		setAmountTo(0)
	}, [selectedFrom, selectedTo])

	return (
		<div className='home__main-wrapper'>
			<div className='home__block-title'>
				<h3 className='home__main-subtitle'>Vsevolod Currency Converter</h3>
				<h1 className='home__main-title'>
					{selectedFrom} to {selectedTo}
				</h1>
			</div>
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
					<ul className='home__block-list home__list'>
						<li className='home__list-item' onClick={() => changeSelectedFrom('USD')}>
							USD
						</li>
						<li className='home__list-item' onClick={() => changeSelectedFrom('EUR')}>
							EUR
						</li>
						<li className='home__list-item' onClick={() => changeSelectedFrom('UAH')}>
							UAH
						</li>
					</ul>
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
					<ul className='home__block-list home__list'>
						<li className='home__list-item' onClick={() => changeSelectedTo('USD')}>
							USD
						</li>
						<li className='home__list-item' onClick={() => changeSelectedTo('EUR')}>
							EUR
						</li>
						<li className='home__list-item' onClick={() => changeSelectedTo('UAH')}>
							UAH
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export { MainBlock }
