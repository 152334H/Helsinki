//import logo from './logo.svg';
//import './App.css';

import React from 'react'

const Header = (props) => (<h1>{props.course}</h1>);
const Part = (props) => (<p>{props.part} {props.exercises}</p>);
const Content = (props) => (<div>
    <Part part={props.part1} exercises={props.exercises1}/>
    <Part part={props.part2} exercises={props.exercises2}/>
    <Part part={props.part3} exercises={props.exercises3}/>
    </div>);
const Total = (props) => (<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>);
const App = () => {
    return (
        <div>
            <Header course="Half Stack application development"/>
            <Content part1="Fundamentals of React" exercises1={10} part2="Using props to pass data" exercises2={7} part3="State of a component" exercises3={14}/>
            <Total exercises1={10} exercises2={7} exercises3={14}/>
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
