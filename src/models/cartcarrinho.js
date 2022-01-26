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
        removerCarrinho(idProduto)
        atualizarQtdCarrinho()
    }

}

let carrinhoCompra = []

function adicionarCarrinho(idProduto) {
    const produtoFiltrado = dataProdutos.find((produto) => produto.id == idProduto)
    carrinhoCompra.push(produtoFiltrado)
}

function removerCarrinho(idProduto) {

    const produtoFiltrado = carrinhoCompra.find((produto) => produto.id == idProduto)
    const index = carrinhoCompra.indexOf(produtoFiltrado)
    carrinhoCompra.splice(index, 1)
}

