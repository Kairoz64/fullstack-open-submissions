const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  );
}

const Part = ({part}) => {
  return (
    <p>{part.name + " " + part.exercises}</p>
  );
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part part={part} key={part.id}/>
        )
      })}
    </div>
  );
}

const Total = ({parts}) => {
  return (
    <p><b>{"Number of exercises " + parts.reduce((a, b) => a + b.exercises, 0)}</b></p>
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
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => {
        return (
          <Course course={course} key={course.id}/>
        );
      })}
    </div>
  )
}

export default App