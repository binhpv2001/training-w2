import axios from '../config/configAxios';

const getATodo = async ( limit ) => {
  return await axios.get( `todos?limit=${ limit }&sort=asc` );
}

const createNewTodo = ( userData ) => {
  return axios.post( 'todo', { ...userData } );
}

const updateCurrentTodo = ( id, data ) => {
  return axios.put( `todo/${ id }`, data );
}

const deleteTodo = async ( id ) => {
  return axios.delete( `todo/${ id }` );
}

export { getATodo, createNewTodo, deleteTodo, updateCurrentTodo }