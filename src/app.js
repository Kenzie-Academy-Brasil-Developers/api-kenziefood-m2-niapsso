import { FetchApi } from "./api/Api.js";
import { TemplateLoja } from "./models/templateLoja.js";
// buscando a resposta da api
const response = await FetchApi.getFetchApi()

const getAll = new TemplateLoja("mainSection")

const getAllButton = document.querySelector(".search-todos")
getAll.createTemplate(response)

getAll.createTemplateFilters(response)








