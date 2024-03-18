import axios from '../setup/axios';

const fetchListTodo = async ( limit ) => {
  try {
    return await axios.get( `todos?limit=${ limit }&sort=asc` );
  } catch ( error ) {
    console.log( 'Error from service. Error: ', error );
  }
}

const createNewTodo = async ( userData ) => {
  try {
    const result = await axios.post( 'todo', userData );
    return result;
  } catch ( error ) {
    console.log( 'Error from service. Error: ', error );
  }
}

const updateCurrentTodo = async ( id, data ) => {
  try {
    const result = await axios.put( `todo/${ id }`, data );
    return result;
  } catch ( error ) {
    console.log( 'Error from service. Error: ', error );
  }
}

const updateListTodo = async ( data ) => {
  try {
    const result = await axios.put( `todos`, { data } );
    return result;
  } catch ( error ) {
    console.log( 'Error from service. Error: ', error );
  }
}

const deleteTodo = async ( id ) => {
  try {
    const result = await axios.delete( `todo/${ id }` );
    return result;
  } catch ( error ) {
    console.log( 'Error from service. Error: ', error );
  }
}

const deleteListTodo = async ( arrId ) => {
  try {
    const result = await axios.post( 'todos', { arrId } );
    return result;
  } catch ( error ) {
    console.log( 'Error from service. Error: ', error );
  }
}

export { fetchListTodo, createNewTodo, deleteTodo, updateCurrentTodo, updateListTodo, deleteListTodo }