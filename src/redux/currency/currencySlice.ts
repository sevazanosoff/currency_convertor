import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrencyArray, CurrencySliceState } from './currencyTypes'
import { fetchCurrency } from './currencyAsyncActions'

const initialState: CurrencySliceState = {
	items: [],
	status: 'loading',
}

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchCurrency.pending, state => {
			state.status = 'loading'
			state.items = []
		})
		builder.addCase(
			fetchCurrency.fulfilled,
			(state, action: PayloadAction<CurrencyArray[]>) => {
				state.items = action.payload
				state.status = 'success'
			},
		)
		builder.addCase(fetchCurrency.rejected, state => {
			state.status = 'error'
		})
	},
})

export const {} = currencySlice.actions

export default currencySlice.reducer
