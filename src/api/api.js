import axios from "axios"

const API_URL = 'https://api.frankfurter.app'


export async function getConversion({queryKey}) {
  const [_key, {fromApi, toApi, amount}] = queryKey
  const response = await axios.get(`${API_URL}/latest?from=${fromApi}&to=${toApi}&amount=${amount}`)
  return response.data    
}

export async function getCurrencies() {
  const response = await axios.get(`${API_URL}/currencies`)
  return response.data
}

export async function getTimeSeries({queryKey}) {
  const [_key, {fromCurrency, toCurrency, dateFrom}] = queryKey
  const response = await axios.get(`${API_URL}/${dateFrom}..?from=${fromCurrency}&to=${toCurrency}`)
  return response.data
}