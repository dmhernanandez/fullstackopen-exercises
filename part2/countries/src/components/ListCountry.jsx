const ListCountry = ({ countries }) => {
  
if (!Array.isArray(countries)) {
    
        return ;
    }
     

    return (
        <ul>
            {
                countries.map((country) => (

                    <li key = {country.ccn3}>
                        { `${country.name.common} `  }
                      <button>Show</button>
                    </li>
                ))
            }
        </ul>
    )
}

export default ListCountry

