const myHeaders: any = new Headers()
//myHeaders.append('X-CMC_PRO_API_KEY', 'e3d5640c-867d-4e25-85af-3b9ff457ba28')
myHeaders.append('Accept', 'application/json')
myHeaders.append('Content-Type', 'application/json')


export const getCurrencieList = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false', {
        method: 'GET',
        'mode': 'no-cors',
        //headers: myHeaders,
        redirect: 'follow'
    }).then((response)=>response.json())
    .catch(error=>console.log('api error',error))

    //const jsonData = await response.json()

    return response
}

export const getCurrencyPriceById = async (id:string) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`, {
        method: 'GET',
        'mode': 'no-cors',
        //headers: myHeaders,
        redirect: 'follow'
    }).then((response)=>response.json())
    .catch(error=>console.log('api error',error))

    //const jsonData = await response.json()

    return response
}