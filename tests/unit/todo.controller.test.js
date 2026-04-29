const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();

const todoId = "69e5fd60fe88dcdcd6cb5fcd";

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('TodoController.getTodos', () => {
    it('should have a getTodos function', () => {
        expect(typeof TodoController.getTodos).toBe('function');
    })
    it("should call TodoModel.find({})", async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });
    it("should return response with status code 200 and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });
    it("should handle errors in getTodos", async () => {
    }) 
}); 

describe('TodoController.createTodo', () => {
    beforeEach(() => {
        req.body = newTodo;
    });

    it('should have a createTodo method', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    });
    it('should create a new todo', () => {
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });
    it('should return 201 response code', async () => {
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', async () => {
        awaitTodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Error creating todo" };
        TodoModel.create.mockRejectedValue(errorMessage);
        await TodoController.createTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe('TodoController.getTodoById', () => {
    it('should have a getTodoById method', () => {
        expect(typeof TodoController.getTodoById).toBe('function');
});
    it('should call TodoModel.findById with route parameter', async () => {
        req.params.todoid = "69e5fd60fe88dcdcd6cb5fcd";
        await TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith("69e5fd60fe88dcdcd6cb5fcd");
});
    it('should return 200 status code and todo json body', async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    req.params.todoid = "69e5fd60fe88dcdcd6cb5fcd";
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
});
    it('should return 404 if todo is not found', async () => {
    TodoModel.findById.mockReturnValue(null);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
});
});
    it('should handle errors in getTodoById', async () => {
    const errorMessage = { message: "Error finding todo" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockRejectedValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
});

describe('TodoController.updateTodo', () => {
    it('should have an updateTodo method', () => {
        expect(typeof TodoController.updateTodo).toBe('function');
    });
    it("should update with TodoModel.findByIdAndUpdate", async () => {
        req.params.todoid = todoId;
        req.body = newTodo;
        await TodoController.updateTodo(req, res, next);
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, { new: true, useFindAndModify: false });
    });
    it("should return updated todo with status code 200", async () => {
        req.params.todoid = todoId;
        req.body = newTodo;
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
        await TodoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it("should handle errors in updateTodo", async () => {
        const errorMessage = { message: "Error updating todo" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndUpdate.mockRejectedValue(rejectedPromise);
        await TodoController.updateTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should return 404 if todo to update is not found", async () => {
        TodoModel.findByIdAndUpdate.mockReturnValue(null);
        await TodoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
}); 