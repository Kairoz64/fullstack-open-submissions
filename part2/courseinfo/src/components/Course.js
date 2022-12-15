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

export default Course;