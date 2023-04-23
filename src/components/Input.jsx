
function Input({
  id,
  fromcurrencyValue,
  setFromCurrencyValue,
  toCurrencyValue,
  currencies,
  haveToWant,
  conversion,
  onInputChange,
  amount,
}) {


  function checkValue(){
    if(id === "have"){
      return haveToWant ? amount : conversion?.data?.rates[fromcurrencyValue] ?? ''
    }
    else{
      return haveToWant ? conversion?.data?.rates[fromcurrencyValue] ?? '' : amount
    }
  }

  return(
    <div className="input">
      <p>I {id}</p>
      <select value={fromcurrencyValue} onChange={setFromCurrencyValue}>
        {Object.keys(currencies)
          .filter(currency => currency != toCurrencyValue)
          .map(currency => 
          <option key={currency} value={currency}>({currency}) - {currencies[currency]}</option>  
        )}
      </select>
      <input 
        type="number" 
        value={checkValue()} 
        onChange={onInputChange}
      ></input>
    </div>

  )
}

export default Input