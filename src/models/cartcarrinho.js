 import { FetchApi } from "../api/Api.js"

 const response = await FetchApi.getFetchApi()
 console.log(response);

const vitrinePrincipal = document.querySelector(".principal-section")

vitrinePrincipal.addEventListener("click", interceptandoEvento)

function interceptandoEvento(evt) {
    const buttonComprar = evt.target
    if (buttonComprar.tagName === "BUTTON") {
        const idProduto = buttonComprar.getAttribute("data-id")
        console.log(idProduto);
        adicionarCarrinho(idProduto)
    }
    if (buttonComprar.tagName === "I") {
        const idProduto = buttonComprar.parentElement.getAttribute("data-id")
        console.log(idProduto)
        adicionarCarrinho(idProduto)
    }

}
interceptandoEvento()


function adicionarCarrinho(idProduto) {
    let carrinhoCompra = []
    const produtoFiltrado = response.find((produto) => produto.id == idProduto)

    carrinhoCompra.push(produtoFiltrado)
}
