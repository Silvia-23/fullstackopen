import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const StatisticEntry = ({text, count}) => {
  return (
    <p>
      {text} {count}
    </p>
  )
}

const App = () => {
  const goodText = "good"
  const neutralText = "neutral"
  const badText = "bad"

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
      <StatisticEntry text={goodText} count={good} />
      <StatisticEntry text={neutralText} count={neutral} />
      <StatisticEntry text={badText} count={bad} />
    </div>
  )
}

export default App