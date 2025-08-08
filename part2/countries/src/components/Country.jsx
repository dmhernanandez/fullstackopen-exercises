const Country = ({ country }) => {
  if (country === null) {
    return
  }
    console.log(country)
  return (
    <div>
      <h1> {country[0].name.common} </h1>
      <p> Capital {country[0].capital}</p>
      <p> Area {country[0].area}</p>
      <h2> Languages </h2>

      <ul>
        {
          Object.entries(country[0].languages).map((language) => (
            <li key={language[0]}> {language[1]}</li>
          ))
        }
      </ul>
      <img src={country[0].flags.png} alt={country[0].flags.alt}/>
    </div>
  )

}

export default Country