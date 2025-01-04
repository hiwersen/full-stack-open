const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => (
  <b>
    Total of {
    parts.reduce((acc, { exercises }) => 
      acc + exercises
    , 0)
    } exercises
  </b>
)
  
const Part = ({ part: { exercises, name } }) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => 
  <div>
    {
      parts.map(part =>
        <Part 
          key={part.id} 
          part={part} 
        />
      )
    }    
  </div>

const Course = ({ course: { name: course, parts } }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course