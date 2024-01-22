const APIKey = 'PPL7RxHq6vXHiRHgoGGkywY9SnoHGP5L'


const getCityUrl = cityName => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getCityDate = async cityName =>{

    try {
        const cityUrl = getCityUrl(cityName)
        const response = await fetch(cityUrl)
        if(!response.ok){
            throw new Error ('Não foi possível obter os dados')
        }
        const [cityData] = await response.json()
        
        return cityData
    }catch({name, message}){
        alert(`${name}: ${message}`)

    }
}


console.log(getCityDate('PAra'))
