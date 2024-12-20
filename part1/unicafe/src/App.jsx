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

const StatisticLine = ({ text, value }) => <tr><th style={{textAlign: 'left'}}>{text}</th><td>{value}</td></tr>

const Statistics = ({ feedbacks }) => {
  const all = feedbacks.reduce((acc, { score }) => score + acc, 0)

  if (all === 0) return <p>No feedback given</p>

  const positive = feedbacks.find(({ label }) => label === 'Good').score
  const average = (positive - feedbacks.find(({ label }) => label === 'Bad').score) / (all || 1)

  return (
    <table>
      <tbody>
        {
          feedbacks
          .map(({ label, score }) => <StatisticLine key={label} text={label} value={score} />)
          .concat([
            <StatisticLine key='all' text='All' value={all} />,
            <StatisticLine key='average' text='Average' value={average} />,
            <StatisticLine key='positive' text='Positive' value={positive * 100 / (all || 1) + ' %'} />
          ])
        }
      </tbody>
    </table>
  )
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
