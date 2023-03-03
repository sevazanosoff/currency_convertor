import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { CurrencyArray } from './currencyTypes'

export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {
	try {
		const response = await axios.get<CurrencyArray[]>(
			'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
		)
		return response.data
	} catch (e) {
		return thunkAPI.rejectWithValue('Error')
	}
})
