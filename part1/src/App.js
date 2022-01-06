//import logo from './logo.svg';
//import './App.css';

import React, {useState} from 'react'

const Display = ({counter}) => <div>{counter}</div>;
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;  
const App = () => {
    const [counter, setCounter] = useState(0);
    const increment = () => setCounter(counter + 1);
    const decrement = () => setCounter(counter - 1);
    return (<>
        <Display counter={counter}/>
        <Button onClick={increment} text="increase"/>
        <Button onClick={decrement} text="decrease"/>
        <Button onClick={() => setCounter(0)} text="reset"/>

        </>)
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
