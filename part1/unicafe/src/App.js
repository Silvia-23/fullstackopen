import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({text, count}) => {
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
  const allText = "all"
  const averageText = "average"
  const positiveText = "positive"

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
      <Statistics text={goodText} count={good} />
      <Statistics text={neutralText} count={neutral} />
      <Statistics text={badText} count={bad} />
      <Statistics text={allText} count={bad + good + neutral} />
      <Statistics text={averageText} count={(good - bad) / (good + neutral + bad)} />
      <Statistics text={positiveText} count={good / (good + bad + neutral)} />
    </div>
  )
}

export default App