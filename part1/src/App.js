//import logo from './logo.svg';
//import './App.css';

import React from 'react'

const Header = (props) => (<h1>{props.course}</h1>);
const Part = (props) => (<p>{props.part} {props.exercises}</p>);
const Content = (props) => (<div>
    {props.parts.map(part =>
        <Part part={part.name} exercises={part.exercises}/>
    )}
    </div>);
const Total = (props) => (<p>
    Number of exercises {props.parts.map(p => p.exercises)
            .reduce((a,b) => a+b)}
    </p>);
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
            name: 'Fundamentals of React',
            exercises: 10
        }, {
            name: 'Using props to pass data',
            exercises: 7
        }, {
            name: 'State of a component',
            exercises: 14
        }]
    };
    return (
        <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        </div>
    )
}

export default App;

/*
function App() {
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
