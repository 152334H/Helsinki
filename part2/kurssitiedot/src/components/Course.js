import React from 'react';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <p><b>Number of exercises {sum}</b></p>
    ) 
}

const Part = (props) => {
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>    
    )
}

const Content = ({ course }) => {
    return (
        <div>
        {course.parts.map(p => <Part part={p} key={p.id}/>)}
        </div>
    )
}

const Course = ({ course }) => {
    return (<div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
        </div>)
}

export default Course
