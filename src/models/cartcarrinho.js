const vitrinePrincipal = document.querySelector(".principal-section")

vitrinePrincipal.addEventListener("click", interceptandoEvento)

function interceptandoEvento(evt) {
    const buttonComprar = evt.target
    if (buttonComprar.tagName === "BUTTON") {
        const idProduto = buttonComprar.getAttribute("id")


        adicionarCarrinho(idProduto)
        atualizarQtdCarrinho()
    }

}
let carrinhoCompra = []

function adicionarCarrinho(idProduto) {
    const produtoFiltrado = dataProdutos.find((produto) => produto.id == idProduto)

    carrinhoCompra.push(produtoFiltrado)
}