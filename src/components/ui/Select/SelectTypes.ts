import { CurrencyArray } from '../../../redux/currency/currencyTypes'

export type SelectProps = {
	currencyArray?: CurrencyArray[]
	selected: string
	selectedText: string
	setSelected: (arg: string) => void
	setSelectedText: (arg: string) => void
}
