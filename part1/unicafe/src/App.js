//import logo from './logo.svg';
//import './App.css';

import React, {useState} from 'react'
const History = (props) => {
    if (props.allClicks.length === 0) {
        return <div>the app is used by pressing the buttons</div>
    }
    return <div>button press history: {props.allClicks.join(' ')}</div>
}
const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)
const StatisticLine = ({name, value}) => (<tr>
    <td>{name}</td> <td>{value}</td>
</tr>)
const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positive = good / total * 100
    if (total === 0) { return <div>No feedback given</div> }
    return (
        <div><h1>statistics</h1>
        <table>
            <StatisticLine name="good" value={good} />
            <StatisticLine name="neutral" value={neutral} />
            <StatisticLine name="bad" value={bad} />
            <StatisticLine name="all" value={total} />
            <StatisticLine name="average" value={average} />
            <StatisticLine name="positive" value={''+positive+'%'} />
        </table>
        </div>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const total = good + neutral + bad

    return (<div>
        <h1>give feedback</h1>
        <Button onClick={() => setGood(good+1)} text='good'/>
        <Button onClick={() => setNeutral(neutral+1)} text='neutral'/>
        <Button onClick={() => setBad(bad+1)} text='bad'/>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>) // NaN is intentional
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
