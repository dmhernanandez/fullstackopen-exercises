import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
      <p>{props.text} {props.value}</p>
  )
}
const Statistics = (props) => {

   const all = props.good + props.neutral + props.bad

   if (all === 0) {
    return(
      <div>
        <p> No feedback given </p>
      </div>
    )
  }

  return(
  <div>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={ (props.good - props.bad) / all } />
      <StatisticsLine text="positive" value= { (props.good / all) * 100 + " %"}  />
  </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1> Give feedback </h1>
       <Button onClick = {() => setGood( good + 1 ) } text="good" />
       <Button onClick = {() => setNeutral(neutral + 1) } text="neutral" />
       <Button onClick = {() => setBad(bad + 1) } text="bad" />

      <h1> Statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    
  )
}

export default App