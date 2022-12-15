const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = (props) => {
  return (
    <p>{props.part.name + " " + props.part.exercises}</p>
  );
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => {
        return (
          <Part part={part} key={part.id}/>
        )
      })}
    </div>
  );
}

const Total = (props) => {
  return (
    <p>{"Number of exercises " + props.parts.reduce((a, b) => a + b.exercises, 0)}</p>
  );
}
const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App