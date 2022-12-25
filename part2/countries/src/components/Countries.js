import { useState } from 'react';
import Weather from './Weather';

const Country = ({country, details=false}) => {
  const [showDetails, setShowDetails] = useState(details);

  const handleClick = () => {
    setShowDetails(true);
  }

  if (showDetails) {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>{`capital ${country.capital[0]}`}</div>
        <div>{`area ${country.area}`}</div>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages)
          .map(lang => <li key={lang}>{country.languages[lang]}</li>)}     
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`}/>
      </div>
    )
  }

  else {
    return <div>{country.name.common}<button onClick={handleClick}>show</button></div>;
  }
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  else if (countries.length === 1) {
    const country = countries[0];
    return (
      <>
        <Country country={country} details/>
        <Weather lat={country.capitalInfo.latlng[0]} 
                 long={country.capitalInfo.latlng[1]}
                 capital={country.capital[0]}/>
      </>
    );
  }

  else {
    return countries.map(country => <Country key={country.cca2} country={country}/>);
  }
}

export default Countries;