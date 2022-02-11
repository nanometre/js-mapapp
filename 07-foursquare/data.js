const API_BASE_URL = 'https://api.foursquare.com/v3'
const API_KEY = 'fsq3P5mP3buE7cXcbRxtqtN9Lz34DFnVqalLl/k4UoLZkS0='

async function search(lat, lng, query) {
    let ll = lat + ',' + lng;

    // example:
    // if ll is "103,31"
    // and query is "chicken rice"
    // then the query string will be "?ll=103,31&query=chicken rice&v=20220211"
    let response = await axios.get(API_BASE_URL + '/places/search',{
        params: {
            'll': ll,
            'v': '20220211', // lock the version of foursquare to the one on this date,
            'query': query,
            'radius': 100000
        } ,
        headers:{
            'Accept':'application/json',
            'Authorization':API_KEY
        }
    })
    return response.data;
}