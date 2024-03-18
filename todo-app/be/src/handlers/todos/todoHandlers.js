const { getAllTodoes, getListTodoes, getTodoesById, createTodo, deleteTodo, updateTodo } = require( "../../database/todoRepository" );

const getTodoes = async ( ctx ) => {
  try {
    const { limit, sort } = ctx.query;
    if ( limit, sort ) {
      const products = getListTodoes( +limit, sort );
      return ctx.body = {
        data: products
      }
    } else {
      const products = getAllTodoes();
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
    const todo = getTodoesById( +id );
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
    const rawData = ctx.request.body;
    const { id } = ctx.params;
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

const deleteAtodo = async ( ctx ) => {
  try {
    const { id } = ctx.params;
    deleteTodo( id );
    console.log( '>>>check id: ', id );
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

module.exports = { getTodo, getTodoes, createATodo, deleteAtodo, updateCurrentTodo };
