const myHeaders: any = new Headers();
myHeaders.append("X-CMC_PRO_API_KEY", "e3d5640c-867d-4e25-85af-3b9ff457ba28");
myHeaders.append('Accept', 'application/json')
myHeaders.append('Content-Type', 'application/json');


export const getCurrencies = async () => {
    const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        method: 'GET',
        'mode': 'no-cors',
        headers: myHeaders,
        redirect: 'follow'
    })

    const jsonData = await response.json()

    return jsonData.data;
}