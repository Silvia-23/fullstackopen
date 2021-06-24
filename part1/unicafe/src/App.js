import React, { useState } from 'react'

const goodText = "good"
const neutralText = "neutral"
const badText = "bad"
const allText = "all"
const averageText = "average"
const positiveText = "positive"

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr>
      <td>{text}</td>
      <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <Statistic text={goodText} value={good} />
      <Statistic text={neutralText} value={neutral} />
      <Statistic text={badText} value={bad} />
      <Statistic text={allText} value={total} />
      <Statistic text={averageText} value={(good - bad) / (good + neutral + bad)} />
      <Statistic text={positiveText} value={good / (good + bad + neutral)} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={goodText} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={neutralText} />
      <Button handleClick={() => setBad(bad + 1)} text={badText} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}

export default App