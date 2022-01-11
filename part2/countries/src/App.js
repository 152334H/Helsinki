import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Filter = ({query, setQuery}) => (<div>
    <input value={query} onChange={(e) => setQuery(e.target.value)}/>
</div>)

const CountryInfo = ({country}) => (<div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
        {Object.values(country.languages)
            .map(l => <li key={l}>{l}</li>)}
    </ul>
    <img src={country.flags.png} alt="flag"/>
</div>)

const CountryMinified = ({country}) => {
    const [show, setShow] = useState(false);
    return (<li key={country.name.common}>
        {country.name.common}
        <button onClick={() => setShow(!show)}>
            {show ? 'hide' : 'show'}
        </button>
        {show && <CountryInfo country={country}/>}
    </li>)
}

const FilteredCountries = ({countries}) => {
    if (countries.length === 1) {
        return <CountryInfo country={countries[0]}/>
    } else if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
        return <ul>
            {countries.map(c => <CountryMinified country={c} />)}
        </ul>
    } else {
        return <p>No matches</p>
    }
}

function App() {
    const [query, setQuery] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => setCountries(response.data))
    }, []);

    if (!countries.length) { return <div>Loading...</div> }

    const selected = countries.filter(c =>
        c.name.common.toLowerCase().includes(query.toLowerCase()));

    return (<>
        <Filter query={query} setQuery={setQuery}/>
        <FilteredCountries countries={selected}/>
    </>)
}

export default App;
