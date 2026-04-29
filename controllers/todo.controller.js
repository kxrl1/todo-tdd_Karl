const TodoModel = require("../models/todo.model")

const createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
}

const getTodos = async (req, res, next) => {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
}

const getTodoById = async (req, res, next) => {
    try {
        const todoModel = await TodoModel.findById(req.params.todoid);
        if (todoModel) {
            res.status(200).json(todoModel);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    } catch (err) {
        next(err);
    }
}

const updateTodo = async (req, res, next) => {
try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
        req.params.todoid,
        req.body,
        { new: true, useFindAndModify: false }
    );
    if (updatedTodo) {
        res.status(200).json(updatedTodo);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
} catch(error) {
    next(error);
}
}

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo
}