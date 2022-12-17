const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  else if (countries.length === 1) {
    return <Country country={countries[0]} details={true}/>;
  }

  else {
    return countries.map(country => <Country key={country.cca2} country={country}/>);
  }
}

const Country = ({country, details=false}) => {
  if (details) {
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
    return <div>{country.name.common}</div>
  }
}

export default Countries;