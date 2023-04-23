import { useState } from 'react'
import './App.css'
import { getCurrencies } from './api/api'
import { useQuery } from "@tanstack/react-query"
import Exchange from "./components/Exchange"
import Graph from "./components/Graph"


function App() {
  const currencies = useQuery({ queryKey: ['currencies'], queryFn: getCurrencies })

  const [conversionData, setConversionData] = useState({})

  if(currencies.isError ) {
    return <h1>Error</h1>
  }

  if(currencies.isLoading) {
    return <h1>Loading...</h1>
  }

  return(
    <>
      <Graph 
        fromCurrency={conversionData?.from?.currency || ''}
        toCurrency={conversionData?.to?.currency || ''}  
      />
      
      <div className='conversion'>
        <h4>{conversionData?.from?.value || '--'} {conversionData?.from?.currency || '--'} Equals</h4>
        <h2>{conversionData?.to?.value || '--'} {conversionData?.to?.currency || '--'}</h2>
      </div>
      
      <Exchange 
        currencies={currencies.data}
        setConversionData={setConversionData}
      />
    </>

    
  )
}

export default App
