import axios from "axios"
import fs from "fs"

const url = "https://studies.cs.helsinki.fi/restcountries/api/all"

axios
    .get(url)
    .then(({ data }) => {
        const names = getNames(data)
        fs.writeFileSync('./db.json', names, 'utf-8');
    })
    .catch(error => console.log(error))


const getNames = data => {
    const names = data
        .map(({ name: { common, official } }) => 
            ({ common, official }))
    return JSON.stringify({ names }, null, 2)
}
    
