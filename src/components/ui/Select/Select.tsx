import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { SelectProps } from './SelectTypes'

import './Select.scss'

const Select: React.FC<SelectProps> = ({
	currencyArray,
	selected,
	selectedText,
	setSelected,
	setSelectedText,
}) => {
	const [inputValue, setInputValue] = React.useState('')
	const [open, setOpen] = React.useState(false)
	const selectRef = React.useRef<HTMLDivElement>(null)
	const inputRef = React.useRef<HTMLInputElement>(null)
	currencyArray = currencyArray?.filter(
		currency =>
			currency.txt.toLowerCase().includes(inputValue.toLowerCase()) ||
			currency.cc.toLowerCase().includes(inputValue.toLowerCase()),
	)

	const closeFocusInput = (): void => {
		setOpen(false)
	}

	const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const deleteInputValueAndFocus = () => {
		setInputValue('')
		if (!open) {
			setOpen(true)
			inputRef.current && inputRef.current.focus()
		}
	}

	const changeSelectedCurrency = (text: string, cc: string) => {
		setSelected(cc)
		setSelectedText(text)
		setInputValue(text)
	}

	React.useEffect(() => {
		setInputValue(selectedText)
	}, [])

	React.useEffect(() => {
		const handleClick = (e: MouseEvent): void => {
			if (!selectRef.current) return
			if (!selectRef.current.contains(e.target as HTMLDivElement)) {
				if (inputValue === '' || currencyArray?.length === 0) {
					setInputValue(selectedText)
				}
				closeFocusInput()
			}
		}

		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [open, closeFocusInput])

	return (
		<div className='select'>
			<div ref={selectRef} className='select__wrapper'>
				<div className='select__blocks'>
					<div className={open ? 'select__block select__block-active' : 'select__block'}>
						{!open && (
							<div className='select__block-about'>
								<img
									className='select__block-image'
									src={
										selected === 'EUR'
											? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png?20081021155534'
											: `https://flagsapi.com/${selected.slice(
													0,
													2,
											  )}/flat/64.png`
									}
									alt='flag'
								/>
								<h3 className='select__block-title'>{selected}</h3>
							</div>
						)}
						<input
							ref={inputRef}
							onClick={() => setOpen(true)}
							onFocus={e => e.target.select()}
							type='text'
							value={inputValue}
							onChange={e => changeInputValue(e)}
							className='select__block-input'></input>
						<div className='select__block-btns'>
							<button
								onClick={deleteInputValueAndFocus}
								className={
									open
										? 'select__block-close select__btn active-close'
										: 'select__block-close select__btn'
								}></button>
							<button
								onClick={() => setOpen(true)}
								className={
									open
										? 'select__block-open select__block-open-active select__btn'
										: 'select__block-open select__btn'
								}></button>
						</div>
					</div>
					{open && (
						<div className='select__list'>
							{currencyArray?.map((currency, index) => (
								<div
									onClick={() =>
										changeSelectedCurrency(currency.txt, currency.cc)
									}
									key={uuidv4()}
									className={
										selected === currency.cc
											? 'select__list-item select__list-item-active'
											: 'select__list-item'
									}>
									<div className='select__list-about'>
										<img
											className='select__block-image'
											src={
												currency.cc === 'EUR'
													? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png?20081021155534'
													: `https://flagsapi.com/${currency.cc.slice(
															0,
															2,
													  )}/flat/64.png`
											}
											alt='flag'
										/>
										<h3 className='select__block-title'>{currency.cc}</h3>
									</div>
									<p className='select__block-text'>{currency.txt}</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export { Select }
