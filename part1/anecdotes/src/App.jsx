import { useState } from 'react'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const getMaxIndex = (arr) => {
  let max = arr[0]
  let index = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      index = i
      max = arr[i]
    }
  }
  return index
}
 
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState( new Array(anecdotes.length).fill(0))  
  const [maxIndex, setMaxIndex] = useState(0)

  const handleVote = (index) => {
      const copyVotes = [...votes]
      copyVotes[index] += 1
      setMaxIndex (getMaxIndex(copyVotes))
      setVote(copyVotes)
      
    }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <p> {anecdotes[selected]} </p> 
      <p> has {votes[selected]} votes </p> 
      <button onClick = {() => handleVote(selected)}>vote</button>
      <button onClick = {() => setSelected( getRandomInt( anecdotes.length ) ) }> next anecdote </button>

      <h1> Anecdote with most votes </h1>
      <p> {anecdotes[maxIndex]} </p> 
      <p> has {votes[maxIndex]} votes </p> 
    </div>
  )
}

export default App