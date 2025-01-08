const Country = ({ country }) => {
    if (!country) return null

    const { 
        name: { common: name },
        capital: [capital],
        area,
        languages,
        flags
     } = country

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
        </div>
    )
}

export default Country