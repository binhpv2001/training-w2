const {fetchAllTodo, fetchListTodo, fetchTodoById, createTodo, deleteTodo, updateTodo} = require("../../database/todoRepository");

const getListTodo = async (ctx) => {
  try {
    const {limit, sort} = ctx.query;
    if (limit || sort) {
      const products = await fetchListTodo({limit, sort});
      return ctx.body = {
        data: products
      }
    }
    const products = fetchAllTodo();
    return ctx.body = {
      data: products
    }


  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}

const getTodo = async (ctx) => {
  try {
    const {id} = ctx.params;
    const todo = fetchTodoById(parseInt(id));
    if (todo) {
      return ctx.body = {
        data: todo
      }
    }
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const createATodo = async (ctx) => {
  try {
    const rawData = ctx.request.body;
    let res = await createTodo(rawData);
    ctx.status = 201;
    return ctx.body = {
      success: true,
      data: res,
    }
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}


const updateCurrentTodo = async (ctx) => {
  try {
    const rawData = ctx.request.body;
    const {id} = ctx.params;

    let res = await updateTodo(parseInt(id), rawData);
    ctx.status = 201;
    return ctx.body = {
      success: true,
      data: res,
    }
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const deleteAtodo = async (ctx) => {
  try {
    const {id} = ctx.params;
    const res = deleteTodo(parseInt(id));
    ctx.status = 201;
    return ctx.body = {
      success: true,
      data: res,
    }
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

module.exports = {getTodo, getListTodo, createATodo, deleteAtodo, updateCurrentTodo};
