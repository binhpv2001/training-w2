const fs = require( 'fs' );
const { data: todos } = require( './todo.json' );

const getListTodos = ( { limit, sort } ) => {
  let sortedTodos = [ ...todos ];
  if ( sort === 'asc' ) {
    sortedTodos.sort( ( a, b ) => new Date( a.createdAt ) - new Date( b.createdAt ) );
  }
  if ( sort === 'des' ) {
    sortedTodos.sort( ( a, b ) => new Date( b.createdAt ) - new Date( a.createdAt ) );
  }
  const result = sortedTodos.slice( 0, limit );
  return result;
}

const getAllTodos = () => {
  let listTodos = [ ...todos ];
  return listTodos;
}

const getTodoById = ( id ) => {
  const todoById = todos.find( todo => todo.id === id );
  return todoById;
}

const createTodo = ( rawData ) => {
  const newTodo = {
    id: Date.now(),
    isCompleted: false,
    createdAt: new Date(),
    ...rawData,
  }
  const newListTodos = [ newTodo, ...todos ];
  return fs.writeFileSync( './src/database/todo.json', JSON.stringify( {
    data: newListTodos
  }, null, 2 ) );
}

const updateTodo = ( id, data ) => {
  const newListTodo = todos.map( todo => {
    if ( todo.id === +id ) {
      return { ...todo, ...data };
    }
    return todo;
  } );
  fs.writeFileSync( './src/database/todo.json', JSON.stringify( { data: newListTodo }, null, 2 ) );
}

const bulkUpdateTodo = ( arrayId, action ) => {
  if ( action === 'complete' ) {
    const result = todos.map( ( todo ) => {
      if ( arrayId.includes( todo.id ) ) {
        return { ...todo, isCompleted: true }
      }
      return todo;
    } )
    fs.writeFileSync( './src/database/todo.json', JSON.stringify( { data: result }, null, 2 ) );
  }
  if ( action === 'inComplete' ) {
    const result = todos.map( ( todo ) => {
      if ( arrayId.includes( todo.id ) ) {
        return { ...todo, isCompleted: false }
      }
      return todo;
    } )
    fs.writeFileSync( './src/database/todo.json', JSON.stringify( { data: result }, null, 2 ) );
  }
}

const deleteTodo = ( id ) => {
  const newListTodo = todos.filter( todo => todo.id !== id );
  fs.writeFileSync( './src/database/todo.json', JSON.stringify( { data: newListTodo }, null, 2 ) );
}

const bulkDeleteTodo = ( arrayId ) => {
  const result = todos.filter( todo => !arrayId.includes( todo.id ) );
  fs.writeFileSync( './src/database/todo.json', JSON.stringify( { data: result }, null, 2 ) );
}

module.exports = {
  getTodoById, getListTodos, getAllTodos, createTodo, updateTodo,
  bulkUpdateTodo, deleteTodo, bulkDeleteTodo
};
