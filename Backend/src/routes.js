const { Router } = require("express");
const routes = Router();
const DevController = require("./Controller/DevController");
const SearchController = require("./Controller/SearchController");
// Query params  req.query = filtros, ordenação, paginação
// Route params  req.params = (identificar recurso para remoção ou alteração ex: id)
// Route params req.body  = (Dados para criação ou alteração de registro)
routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.get("/search", SearchController.index);

module.exports = routes;
