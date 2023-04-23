import { Chart } from 'react-charts'
import { useMemo } from 'react'

function GraphChart({timeSeriesData, toCurrency}){

  const data= useMemo (() =>  [
    {
      label: toCurrency,
      data: timeSeriesData
    }
  ], []
)

const primaryAxis = useMemo(
  () => ({
    getValue: datum => datum.date,
  }),
  []
)

const secondaryAxes = useMemo(
  () => [
    {
      getValue: datum => datum.value,
      elementType: 'line'
    },
  ],
  []
)

  return (
      <Chart
        options={{
          data, 
          primaryAxis, 
          secondaryAxes, 
          dark:true,
          defaultColors: ["red"]
        }}
      />
  )
}

export default GraphChart