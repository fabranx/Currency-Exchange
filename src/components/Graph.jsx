import { useQuery } from "@tanstack/react-query"
import { getTimeSeries } from "../api/api";
import GraphChart from "./GraphChart";


const today = new Date();
const prev30Days = new Date(today - (30*24*60*60*1000));

// YYYY-MM-DD format
const dateFrom = `${prev30Days.getFullYear()}-${('0'+(prev30Days.getMonth()+1)).slice(-2)}-${('0'+prev30Days.getDate()).slice(-2)}`


function Graph({fromCurrency, toCurrency}) {

  const timeSeries = useQuery({
    queryKey:['timeseries', {fromCurrency, toCurrency, dateFrom}],
    queryFn: getTimeSeries,
    enabled: enabled()
  })

  function enabled(){
    if(fromCurrency && toCurrency){
      return true
    }
    else return false
  }

  if(timeSeries.isError){
    return <h1>Error</h1>
  }

  if(timeSeries.isInitialLoading){
    return (
      <div className="graph">
        <h1>Loading...</h1>
      </div>
    )
  }

  if(timeSeries.isSuccess){
    return (
    <div className="graph">
      <GraphChart
        timeSeriesData={Object.entries(timeSeries.data.rates).map(el => {return {date: el[0], value:el[1][toCurrency]}})}
        toCurrency={toCurrency}
      />      
    </div>
    )
  }
 
}


export default Graph