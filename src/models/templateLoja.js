import { FetchApi } from "../api/Api.js";

class TemplateLoja {
  constructor(idMainSection, idCarrinho, idNav) {
    this.mainSection = document.getElementById(idMainSection);
    this.mainCarrinho = document.getElementById(idCarrinho);
    this.navContainer = document.getElementById(idNav)
    this.mainSection.addEventListener("click", this)
    this.mainCarrinho.addEventListener("click", this)
    this.navContainer.addEventListener("click", this)
    this.itensToBuy = [];
  }

  async getApi() {
    return FetchApi.getFetchApi();
  }

  async createTemplate(list = this.getApi()) {
    const newList = await list;
    this.mainSection.innerHTML = ""
    newList.forEach((product) => {
      this.mainSection.innerHTML += `
            <div class="card-principal">
          <figure>
            <img
              src="${product.imagem}"
              alt="${product.nome}">
            <span class="panificadora">
              <img src="./assets/img/${product.categoria
        }.png" class="img-bread"/>
              <p>${product.categoria}</p>
            </span>
          </figure>
          <h3>${product.nome}</h3>
          <p class="descrição">${product.descricao}</p>
          <div class="botton-div">
            <span class="preço">R$ ${product.preco
          .toFixed(2)
          .replace(".", ",")}</span>
            <button class="btn-add" data-id="${product.id}">
            <i class="fas fa-cart-plus" data-id="${product.id}"></i></button>
          </div>
        </div>
            `;
    });
  }

  async createTemplateCarrinho(list) {
    let newList = await list;
    this.mainCarrinho.innerHTML = ""
    const paizao = this.mainCarrinho.parentElement
    if (newList.length === 0) {
      paizao.removeChild(paizao.childNodes[5])
      this.mainCarrinho.innerHTML = `
      <div class="empty-card">
        <i class="fas fa-shopping-bag"></i>
        <h3>Ops!</h3>
        <p>Por enquanto não temos produtos no carrinho</p>
      </div>
      `
    } else {
      newList.forEach((product) => {
        this.mainCarrinho.innerHTML += `
          <div class="card-carrinho">
            <figure>
              <img
                src="${product.imagem}"
                alt="" class="cart">
            </figure>
          <div class="descricao">
            <h3>${product.nome}</h3>
            <p>${product.categoria}</p>
            <span class="preço">R$ ${product.preco
            .toFixed(2)
            .replace(".", ",")}</span>
          </div>
          <button class="btn-trash" data-id="${product.id}"><i class="fas fa-trash" data-id="${product.id}"></i></button>
        </div>
          `
      });
      const div = document.createElement("div")
      div.classList.add("counter-shop")
      div.innerHTML = `
      <div>
        <spam class="counter">Quantidade</spam>
        <span class="total">${this.itensToBuy.length}</span>
      </div>
      <div>
        <span class="counter">Total</span>
        <span class="total">R$ ${this.getTotalValue().toFixed(2).replace(".", ",")}</span>
      </div>
      `
      if (paizao.childNodes[5] !== undefined) {
        paizao.removeChild(paizao.childNodes[5])
      }
      paizao.appendChild(div)
    }
  }

  getTotalValue() {
    return this.itensToBuy.reduce((acc, { preco }) => acc + preco, 0)
  }

  async filter(value) {
    const allProducts = await this.getApi()
    const filtred = allProducts.filter(({ categoria }) => categoria.toLowerCase().includes(value))
    return filtred
  }

  async handleEvent(e) {
    const targetedEl = e.target
    const allProducts = await this.getApi()
    if (
      targetedEl.tagName === "LI" ||
      targetedEl.classList[0] === "navP" ||
      targetedEl.classList[0] === "img-bread"
    ) {
      const text = e.target.closest("li").innerText.toLowerCase()
      const productsFiltred = await this.filter(text)
      if (productsFiltred.length !== 0) {
        this.createTemplate(productsFiltred)
      } else {
        this.createTemplate(allProducts)
      }
    }
    if (
      targetedEl.classList[0] === "btn-add" ||
      targetedEl.classList[1] === "fa-cart-plus"
    ) {
      const idProduct = targetedEl.dataset.id
      const productToBuy = allProducts.filter(({ id }) => id == idProduct)
      this.itensToBuy.push(...productToBuy)
      this.createTemplateCarrinho(this.itensToBuy)
    }
    if (
      targetedEl.classList[0] === "btn-trash" ||
      targetedEl.classList[1] === "fa-trash"
    ) {
      const idProduct = targetedEl.dataset.id
      const product = this.itensToBuy.find((product) => product.id == idProduct)
      const index = this.itensToBuy.indexOf(product)
      this.itensToBuy.splice(index, 1)
      this.createTemplateCarrinho(this.itensToBuy)
    }
  }

}

export { TemplateLoja };
