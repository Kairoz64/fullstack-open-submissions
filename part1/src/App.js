const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  return (
    props.parts.map((val) => {
      return (
        <p>{val['part_name'] + " " + val['exercises']}</p>
      );
    })
  );
}

const Total = (props) => {
  return (
    <p>{"Number of exercises " + props.exercises.reduce((a, b) => a + b, 0)}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={
        [
          {part_name: part1, exercises: exercises1},
          {part_name: part2, exercises: exercises2},
          {part_name: part3, exercises: exercises3}
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App