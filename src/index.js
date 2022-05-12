document.addEventListener("DOMContentLoaded", () => {

    fetch("https://restcountries.com/v3.1/all").then(res => res.json()).then(data => postData(data))
    // Posts data to Database
    async function postData(data) {
        for (let i = 0; i < 50; i++) {

            const CO = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:
                    JSON.stringify(createBody(data[i], i + 1))
            }
            fetch("http://localhost:3000/countries", CO).catch(err => console.log(err))
            await delay(1000)
        }
    }

    // Delays action
    const delay = async (ms = 1000) =>
        new Promise(resolve => setTimeout(resolve, ms))

    // Cuts down on unneeded info
    function createBody(country, id) {
        return {
            name: country.name.common,
            capital: country.capital,
            currencies: country.currencies,
            languages: country.languages,
            population: country.population,
            flags: country.flags,
            id: id

        }
    }
    // Chain .then off of this for random country info
    async function getRNGCountry() {
        const rngNum = Math.floor(Math.random() * (50 - 1 + 1) + 1)
        return await fetch(`http://localhost:3000/countries/${rngNum}`).then(res => res.json())

    }
    // Example
    //getRNGCountry().then(country => console.log(country))
})