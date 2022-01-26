import { FetchApi } from "../api/Api.js";

class TemplateLoja {
  constructor(idMainSection, idCarrinho) {
    this.mainSection = document.getElementById(idMainSection);
    this.MainCarrinho = document.getElementById(idCarrinho);
    this.itensToBuy = [];
  }

  async getApi() {
    return FetchApi.getFetchApi();
  }

  async createTemplate(list) {
    let newList = await list;
    newList.forEach((product) => {
      this.mainSection.innerHTML += `
            <div class="card-principal">
          <figure>
            <img
              src="${product.imagem}"
              alt="${product.nome}">
            <span class="panificadora">
              <img src="./assets/img/${
                product.categoria
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
            <button data-id="${
              product.id
            }"><i class="fas fa-cart-plus"></i></button>
          </div>
        </div>
            `;
    });
  }

  async createTemplateCarrinho(list) {
    let newList = await list;
    newList.forEach((product) => {
      this.MainCarrinho.innerHTML += `
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
        <button class="btn-trash"><i class="fas fa-trash"></i></button>
      </div>
        `;
    });
  }

  async createTemplateFilters(list) {
    let newList = await list;
    const getFilters = document.querySelector("nav");
    const getFilterProducts = (e) => {
      const targetEl = e.target;
      if (targetEl.tagName === "LI") {
        targetEl.innerText;
        if (targetEl.innerText === "Todos") {
          this.mainSection.innerHTML = "";
          this.createTemplate(newList);
        } else {
          this.mainSection.innerHTML = "";
          const productFiltered = newList.filter((product) => {
            return product.categoria === targetEl.innerText;
          });
          this.createTemplate(productFiltered);
        }
      }
      if (targetEl.tagName === "P") {
        targetEl.parentElement.innerText;
        if (targetEl.parentElement.innerText === "Todos") {
          this.mainSection.innerHTML = "";
          this.createTemplate(newList);
        } else {
        this.mainSection.innerHTML = "";
        const productFiltered = newList.filter((product) => {
          return product.categoria === targetEl.parentElement.innerText;
        });
        this.createTemplate(productFiltered);
      }
      }
    };
    getFilters.addEventListener("click", getFilterProducts);
  }
}

export { TemplateLoja };
