import React from 'react'

import { fetchCurrency } from '../redux/currency/currencyAsyncActions'
import { useAppDispatch, useAppSelector } from '../redux/store/store'
import { Select } from '../components/ui/Select/Select'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import '../scss/pages/Home.scss'

const Home = () => {
	const dispatch = useAppDispatch()
	const currencyArray = useAppSelector(state => state.currency.items)
	const status = useAppSelector(state => state.currency.status)
	const [selectedFrom, setSelectedFrom] = React.useState('USD')
	const [selectedFromText, setSelectedFromText] = React.useState('Долар США')
	const [selectedTo, setSelectedTo] = React.useState('EUR')
	const [selectedToText, setSelectedToText] = React.useState('Евро')

	const currentArray =
		currencyArray &&
		currencyArray
			.slice(0, 57)
			.filter(currency => currency.cc !== 'RUB' && currency.cc !== 'XDR')
			.concat({ r030: 970, txt: 'Українська гривня', rate: 1.0, cc: 'UAH' })
			.sort((a, b) => a.cc.localeCompare(b.cc))

	React.useEffect(() => {
		dispatch(fetchCurrency())
	}, [])

	return (
		<section className='home'>
			<div className='home__wrapper'>
				<Header />
				<main className='home__main'>
					<Select
						currencyArray={currentArray}
						selected={selectedFrom}
						selectedText={selectedFromText}
						setSelected={setSelectedFrom}
						setSelectedText={setSelectedFromText}
					/>
				</main>
				<Footer />
			</div>
		</section>
	)
}

export { Home }
