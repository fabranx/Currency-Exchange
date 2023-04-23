import { useEffect, useState, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { getConversion } from "../api/api"
import Input from "./Input"


function Exchange({ currencies, setConversionData}){

  const [haveCurrency, setHaveCurrency] = useState('EUR')
  const [wantCurrency, setWantCurrency] = useState('USD')
  const [fromApi, setFromApi] = useState(haveCurrency)
  const [toApi, setToApi] = useState(wantCurrency)
  const [amount, setAmount] = useState(1)
  const [haveToWant, setHaveToWant] = useState(true)

  const inputRegex = /^[0-9]+(.[0-9]+)*$|^$/g


  function enabled() {
    if (fromApi && toApi && amount!=0){
      return true
    }
    else return false
  }

  const conversion = useQuery({ 
    queryKey: ['currencies', {fromApi, toApi, amount}],
    queryFn: getConversion,
    enabled: enabled(),
  })
  

  useEffect(() => {
    if(conversion?.data?.rates){
      setConversionData({
        from: {currency: conversion.data.base, value: conversion.data.amount},
        to: {currency: Object.keys(conversion.data.rates)[0], value: Object.values(conversion.data.rates)[0]}
      })
    }
  }, [conversion.data])


  function onHaveInputChange(e){
    if(inputRegex.test(e.target.value)){
      setFromApi(haveCurrency)
      setToApi(wantCurrency)
      setHaveToWant(true)
      setAmount(e.target.value)
    }
  }

  function onWantInputChange(e){
    if(inputRegex.test(e.target.value)){
      setFromApi(wantCurrency)
      setToApi(haveCurrency)
      setHaveToWant(false)
      setAmount(e.target.value)
    }
  }

  function onHaveSelectChange(e){
    setHaveCurrency(e.target.value)
    if(haveToWant){
      setFromApi(e.target.value)
    }
    else{
      setToApi(e.target.value)
    }
  }

  function onWantSelectChange(e){
    setWantCurrency(e.target.value)
    if(haveToWant){
      setToApi(e.target.value)
    }
    else {
      setFromApi(e.target.value)
    }
  }

  if(conversion.isError) {
    return <h1>Error</h1>
  }

  return (
    <div className="input-field">
      <Input
        id="have"
        fromcurrencyValue={haveCurrency}
        toCurrencyValue={wantCurrency}
        setFromCurrencyValue={onHaveSelectChange}
        currencies={currencies}
        haveToWant={haveToWant}
        conversion={conversion}
        onInputChange={onHaveInputChange}
        amount={amount}
      />
      
      <Input
        id="want"
        fromcurrencyValue={wantCurrency}
        toCurrencyValue={haveCurrency}
        setFromCurrencyValue={onWantSelectChange}
        currencies={currencies}
        haveToWant={haveToWant}
        conversion={conversion}
        onInputChange={onWantInputChange}
        amount={amount}
      />
    </div>
  )

}

export default Exchange