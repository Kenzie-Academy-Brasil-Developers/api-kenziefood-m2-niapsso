import { FetchApi } from "../api/Api.js"
import { TemplateLoja } from "./templateLoja.js"

class Searcher {
    constructor(idSearcher) {
        this.formContainer = document.getElementById(idSearcher)
        this.vitrine = new TemplateLoja("productsContainer", "cartContainer", "navContainer")
        this.formContainer.addEventListener("keyup", this)
        this.vitrine.createTemplate()
    }

    async filterProducts(value) {
        const allProducts = await FetchApi.getFetchApi()
        const filtred =  allProducts.filter(({ nome, categoria }) => nome.toLowerCase().includes(value) || categoria.toLowerCase().includes(value))
        return filtred
    }


    async handleEvent(e) {
        const inputValue = e.target.value.toLowerCase()
        const productsFiltred = this.filterProducts(inputValue)
        this.vitrine.createTemplate(productsFiltred)
    }
}

export { Searcher }