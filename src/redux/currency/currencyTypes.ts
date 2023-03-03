export type CurrencyArray = {
	r030?: number
	txt: string
	rate: number
	cc: string
	exchangedate?: string
	flagUrl?: string
}

export type CurrencySliceState = {
	items?: CurrencyArray[]
	status?: string
}
