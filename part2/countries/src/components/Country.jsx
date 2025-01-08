const Country = ({ country, weather }) => {
    if (!country) return null

    const { 
        name: { common: name },
        capital: [capital],
        area,
        languages,
        flags
    } = country

    const { 
        current: {
            temperature2m: temperature,
            cloudCover,
            windSpeed10m: wind
        } 
    } = weather
    
    const style = { 
        listStyle: 'none',
        padding: 0
    }

    return (
        <div>
            <h1>{name}</h1>
            <div>
                <ul style={style}>
                    <li>capital {capital}</li>
                    <li>area {area}</li>
                </ul>
            </div>
            <div>
                <b>Languages:</b>
                <ul>
                    {
                        Object.values(languages).map(language => 
                            <li key={language}>{language}</li>)
                    }
                </ul>
            </div>
            <div>
                <img 
                    src={`${flags.png}`} 
                    alt={flags.alt}
                    width={150} 
                />
            </div>
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature&nbsp;
                    {(temperature[0]).toFixed(2)}&nbsp; 
                    {temperature[1]}
                </p>
                <p>cloud cove&nbsp; 
                    {Math.ceil(cloudCover[0])}&nbsp; 
                    {cloudCover[1]}
                </p>
                <p>wind&nbsp; 
                    {(wind[0]).toFixed(2)}&nbsp;
                    {wind[1]}
                </p>
                <a 
                    href="https://open-meteo.com/"
                    target="_blank"
                    style={{ fontSize: 14 }}
                >
                    Weather data by Open-Meteo.com
                </a>
            </div>
        </div>
    )
}

export default Country