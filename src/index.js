document.addEventListener("DOMContentLoaded", () => {
    let countryName = ""
    let score = 0

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
            id: id,


        }
    }
    // Chain .then off of this for random country info
    async function getRNGCountry() {
        const rngNum = Math.floor(Math.random() * (50 - 1 + 1) + 1)
        return await fetch(`http://localhost:3000/countries/${rngNum}`).then(res => res.json())
    }
    // Example
    getRNGCountry()
        .then(country => {
            listData(country);
            // evalInput(country);

        });

    function listData(country) {
        const capitalCity = document.getElementById('capital');
        capitalCity.innerText = `The capital city of _______ is ${country.capital}.`;
        const flagImg = document.getElementById('flag-img');
        flagImg.src = country.flags.png;
        const population = document.getElementById('population');
        population.innerText = "Total Population: " + country.population;
        const currency = document.getElementById('currency');
        currency.innerText = "Currencies: " + (handleCurrency(country.currencies));
        const languages = document.getElementById('languages');
        languages.innerText = "Languages: " + (Object.values(country.languages));
        countryName = country.name
        console.log(countryName)
    };
    function handleCurrency(currencies) {
        const currencyArray = []
        for (const key in currencies) {
            currencyArray.push(currencies[key].name)
        }
        return currencyArray.join(", ")
    }


    //submit form 
    const form = document.getElementById('guess-form');
    form.addEventListener('submit', (e) => handleSubmit(e));
    function handleSubmit(e) {
        e.preventDefault();
        let input = document.getElementById('country-name');
        evalInput(input.value);
        input.value = "";
    }

    document.getElementById("next-round").onclick = () => getRNGCountry()
        .then(country => {
            listData(country);
            // evalInput(country);

        });

    // create a function that adds 
    //                 const totalPoints = document.createElement("total-points");
    //                     pointTotal = ;
    // check if the user input matches country.name
    // for each question answered correctly. add 10 points to a div with an id "total-points";

    function evalInput(input) {
        if (input.toLowerCase() == countryName.toLowerCase()) {
            appendPoints(10)
            alert("That's right!")
        } else {
            appendPoints(-5)
            alert("Sorry, guess again!")
        }

    }
    function appendPoints(value) {
        score += value
        document.getElementById("score").innerText = `Current Score: ${score}`

    }





    //display list of countries on the side
    //add event listener click
    // country.population,country.currencies,country.languages;
    // document.addEventListener('DOMContentLoaded', function() {
    //     fetch(`http://localhost:3000/countries`)
    //     .then(response => response.json())
    //     .then(countries => {
    //           for(let country of countries) {  
    //                      
    //                     evalInput(country); 
    //         };
    // });
    // });
    // const countryList = document.querySelector('#country-list');
    // function listCountries(country){
    // const li = document.createElement("li"); 
    //         li.innerText = country.name;
    //             countryList.append(li);
    //                 li.addEventListener('click', () => {
    //                     const img = document.createElement('img');
    //                     const name = document.createElement('name');
    //                     const capitalCity = document.querySelector('h4');
    //                     const currencies = document.createElement('currencies');
    //                         img.src = country.flags;
    //                         name.innerHTML = country.name;
    //                         capitalCity.innerHTML = country.capital;
    //                         currencies.innerHTML = country.currencies;
    //         })
    // }










});