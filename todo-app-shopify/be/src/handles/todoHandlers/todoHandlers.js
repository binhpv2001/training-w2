const { createTodo, deleteTodo, getAllTodos, getListTodos, getTodoById, updateTodo, bulkUpdateTodo, bulkDeleteTodo } = require( "../../database/todoRepository" );

const getTodoes = async ( ctx ) => {
  try {
    const { limit, sort } = ctx.query;
    if ( limit, sort ) {
      const products = getListTodos( { limit, sort } );
      return ctx.body = {
        data: products
      }
    } else {
      const products = getAllTodos();
      return ctx.body = {
        data: products
      }
    }

  } catch ( e ) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}

const getTodo = async ( ctx ) => {
  try {
    const { id } = ctx.params;
    const todo = getTodoById( +id );
    if ( todo ) {
      return ctx.body = {
        data: todo
      }
    }
  } catch ( e ) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const createATodo = async ( ctx ) => {
  try {
    const rawData = ctx.request.body;
    createTodo( rawData );

    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const updateCurrentTodo = async ( ctx ) => {
  try {
    const { id } = ctx.params;
    const rawData = ctx.request.body;
    updateTodo( id, rawData );

    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const updateListTodo = async ( ctx ) => {
  try {
    const { data } = ctx.request.body;
    bulkUpdateTodo( data.selectedTodo, data.action );

    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const deleteAtodo = async ( ctx ) => {
  try {
    const { id } = ctx.params;
    deleteTodo( +id );
    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

const deleteListTodo = async ( ctx ) => {
  try {
    const { arrId } = ctx.request.body;
    bulkDeleteTodo( arrId );
    ctx.status = 201;
    return ctx.body = {
      success: true
    }
  } catch ( e ) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

module.exports = { getTodo, getTodoes, createATodo, updateListTodo, deleteAtodo, updateCurrentTodo, deleteListTodo };
