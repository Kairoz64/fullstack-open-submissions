import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  //Creates an array filled with 0's and the length of the anecdotes array
  const points = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);

  const setRandomMessage = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomInt);
  }

  const increasePointByOne = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  const indexOfMax = (arr) => {
    if (arr.length === 0) {
      return -1
    }

    let max = arr[0]
    let maxIndex = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>{"has " + votes[selected] + " votes"}</div>
      <div>
        <Button text="vote" handleClick={increasePointByOne}/>
        <Button text="next anecdote" handleClick={setRandomMessage}/>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[indexOfMax(votes)]}</div>
    </div>
  )
}

export default App