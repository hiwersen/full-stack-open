import { useState } from 'react'

const Header = ({ title, subtitle }) => {
  return (
    <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </header>
  )
}

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>

const ButtonsDisplay = ({ feedbacks }) => {
  const handleClick = (score, setScore) => () => setScore(score + 1)

  return feedbacks.map(({ label, score, setScore }) => (<Button
    key={label}
    onClick={handleClick(score, setScore)}
    label={label} 
    />))
} 

const Statistics = ({ feedbacks }) => {
  const all = feedbacks.reduce((acc, { score }) => score + acc, 0)

  if (all === 0) return <p>No feedback given</p>

  const positive = feedbacks.filter(({ label }) => label === 'Good')[0].score
  const average = (positive - feedbacks.filter(({ label }) => label === 'Bad')[0].score) / (all || 1)

  return feedbacks
    .map(({ label, score }) => <p key={label}>{label} {score}</p>)
    .concat([
      <p key='all'>All {all}</p>,
      <p key='average'>Average {average}</p>,
      <p key='positive'>Positive {positive * 100 / (all || 1)} %</p>
    ])
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbacks = [
    {
      label: 'Good',
      score: good,
      setScore: setGood
    },
    {
      label: 'Neutral',
      score: neutral,
      setScore: setNeutral
    },
    {
      label: 'Bad',
      score: bad,
      setScore: setBad
    }
  ]

  return (
    <div>

      <Header 
      title='Unicafe'
      subtitle='University of Helsinki'
      />

      <section>
        <h2>Give Feedback</h2>
        <ButtonsDisplay feedbacks={feedbacks} />
      </section>

      <section>
        <h2>Statistics</h2>
        <Statistics feedbacks={feedbacks} />
      </section>

    </div>
  )
}

export default App
