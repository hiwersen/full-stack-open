const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part: { name, exercises } }) =>  <p>{name} {exercises}</p>;

const Content = ({ parts }) => (
  <div>
    {
      parts.map((part, index) => <Part part={part} key={index} />)
    }
  </div>
);

const Total = ({ parts }) => <p>Number of exercises {parts.reduce((acc, { exercises: item }) => acc + item, 0)}</p>;

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;