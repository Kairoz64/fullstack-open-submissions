import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [term, setTerm] = useState('');

  const countriesToShow = !term
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(term))

  const onTermChange = (e) => {
    setTerm(e.target.value);
  }

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then((response) => {
      setCountries(response.data);
    });
  }, [])

  return (
    <div>
      <Search term={term} onChange={onTermChange} />
      <Countries countries={countriesToShow}/>
    </div>
  );
}

export default App;
