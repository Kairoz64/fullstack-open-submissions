import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const Display = ({text, value}) => {
  return <div>{text + " " + value}</div>
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good*1 + neutral*0 + bad*-1)/total;
  const positivePorcentage = good/total*100

  if (total <= 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <Display text="good" value={good}/>
      <Display text="neutral" value={neutral}/>
      <Display text="bad" value={bad}/>
      <Display text="all" value={total}/>
      <Display text="average" value={average}/>
      <Display text="positive" value={positivePorcentage + "%"}/>
    </div>
  );
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App