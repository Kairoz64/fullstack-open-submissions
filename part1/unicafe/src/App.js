import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const Display = ({text, counter}) => {
  return <div>{text + " " + counter}</div>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGoodByOne = () => setGood(good + 1);
  const increaseNeutralByOne = () => setNeutral(neutral + 1);
  const increaseBadByOne = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={increaseGoodByOne}/>
      <Button text="neutral" handleClick={increaseNeutralByOne}/>
      <Button text="bad" handleClick={increaseBadByOne}/>
      <h1>statistics</h1>
      <Display text="good" counter={good}/>
      <Display text="neutral" counter={neutral}/>
      <Display text="bad" counter={bad}/>
    </div>
  )
}

export default App