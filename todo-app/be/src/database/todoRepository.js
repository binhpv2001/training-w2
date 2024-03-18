const fs = require( 'fs' );
const { data: todoes } = require( './todo.json' );

const getListTodoes = ( litmit, sort ) => {
  if ( sort === 'asc' ) {
    todoes.sort( ( a, b ) => new Date( a.id ) - new Date( b.id ) );
  }
  if ( sort === 'des' ) {
    todoes.sort( ( a, b ) => new Date( b.id ) - new Date( a.id ) );
  }
  const result = todoes.slice( 0, litmit );
  return result
}

const getAllTodoes = () => {
  return todoes;
}

const getTodoesById = ( id ) => {
  return todoes.find( product => product.id === id );
}

const createTodo = ( data ) => {
  const result = [ data, ...todoes ];
  return fs.writeFileSync( './src/database/todo.json', JSON.stringify( {
    data: result
  } ) );
}

const updateTodo = ( id, data ) => {
  const updatedData = todoes.map( todo => {
    if ( todo.id === id ) {
      return { ...todo, ...data };
    } else {
      return todo;
    };
  } );
  fs.writeFileSync( './src/database/todo.json', JSON.stringify( { data: updatedData }, null, 2 ) );
}

const deleteTodo = ( id ) => {
  const deletedProduct = todoes.filter( item => item.id !== id );
  fs.writeFileSync( './src/database/todo.json', JSON.stringify( { data: deletedProduct }, null, 2 ) );
}

module.exports = {
  getAllTodoes,
  getListTodoes,
  getTodoesById,
  createTodo,
  updateTodo,
  deleteTodo
};
