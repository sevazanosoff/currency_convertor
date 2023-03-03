import React from 'react'

import { fetchCurrency } from '../redux/currency/currencyAsyncActions'
import { useAppDispatch, useAppSelector } from '../redux/store/store'
import { Select } from '../components/ui/Select/Select'
import { Input } from '../components/ui/Input/Input'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import '../scss/pages/Home.scss'
import { MainBlock } from '../components/MainBlock'

const Home = () => {
	// Redux
	const dispatch = useAppDispatch()
	const currencyArray = useAppSelector(state => state.currency.items)
	const status = useAppSelector(state => state.currency.status)
	// // Some changes for array(Because of bad API...)
	const currentArray =
		currencyArray &&
		currencyArray
			.slice(0, 57)
			.filter(currency => currency.cc !== 'RUB' && currency.cc !== 'XDR')
			.concat({ r030: 970, txt: 'Українська гривня', rate: 1.0, cc: 'UAH' })
			.sort((a, b) => a.cc.localeCompare(b.cc))

	// FETCH DATA
	React.useEffect(() => {
		dispatch(fetchCurrency())
	}, [])

	return (
		<section className='home'>
			<div className='home__wrapper'>
				<Header />
				<main className='home__main'>
					<div className='home__main-wrapper'>
						<div className='home__block-title'>
							<h3 className='home__main-subtitle'>Vsevolod Currency Converter</h3>
							<h1 className='home__main-title'>
								{/* {selectedFrom} to {selectedTo} */}
							</h1>
						</div>
						<MainBlock currentArray={currentArray} />
					</div>
				</main>
				<Footer />
			</div>
		</section>
	)
}

export { Home }
