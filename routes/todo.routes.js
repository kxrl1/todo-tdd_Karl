const express = require("express");
const todoController = require("../controllers/todo.controller");
const routes = express();

routes.post("/", todoController.createTodo);

module.exports = routes;