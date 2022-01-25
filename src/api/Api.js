
class FetchApi {

    static async getFetchApi(){
        let response = await fetch('https://kenzie-food-api.herokuapp.com/product')
        .then(res => res.json())
        return response
    }
}

export { FetchApi }