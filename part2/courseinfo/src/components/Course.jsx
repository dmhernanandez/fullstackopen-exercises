const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
     {props.parts.map( ( part ) => 
          <Part key={part.id} part={part} /> 
     )
   }
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <h4>total of {props.total} exercises </h4>

const Course = ({ course }) => {

     const total = course.parts.reduce( (sum, part) => sum + part.exercises, 0)
     return (
          <div>

            <Header key = {course.id} course={course.name} />
            <Content parts={course.parts} />
           <Total total={total}/>
          </div>
        )
   }

export default Course
