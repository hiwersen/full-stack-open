import { useState } from 'react'

const Anecdote = ({ anecdote, points }) => (
  <>
    <blockquote>{anecdote}</blockquote>
    <p>Has {points} votes</p>
  </>
)

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

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
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandom = (from, to) => from + Math.floor(Math.random() * to)
  const handleNextClick = () => setSelected(getRandom(0, anecdotes.length))

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  const sortedPoints = points.slice().sort((a, b) => b - a)
  const highestScore = sortedPoints[0]
  const mostVoted = points.findIndex(e => e === highestScore)
  
  return (
    <div>
      <header>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      </header>
      <section>
        <Button onClick={handleVoteClick} label='Vote' />
        <Button onClick={handleNextClick} label='Next anecdote' />
      </section>
      <section>
        <h2>Anecdote with most votes</h2>
        <Anecdote anecdote={anecdotes[mostVoted]} points={points[mostVoted]} />
      </section>
    </div>
  )
}

export default App
