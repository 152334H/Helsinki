//import logo from './logo.svg';
//import './App.css';

import React, {useState} from 'react'
const History = (props) => {
    if (props.allClicks.length === 0) {
        return <div>the app is used by pressing the buttons</div>
    }
    return <div>button press history: {props.allClicks.join(' ')}</div>
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)
const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
        {left}
        <Button handleClick={handleLeftClick} text="left"/>
        <Button handleClick={handleRightClick} text="right"/>
        {right}
        <History allClicks={allClicks}/>
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
