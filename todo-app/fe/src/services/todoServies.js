import axios from '../config/configAxios';

const getATodo = async (limit) => {
  try {
    return await axios.get(`todos?limit=${limit}&sort=des`);
  } catch (error) {
    console.log('Error from service with error: ', error);
  }
}

const createNewTodo = async (data) => {
  try {
    return await axios.post('todo', data);
  } catch (error) {
    console.log('Error from service with error: ', error);
  }
}

const updateCurrentTodo = (id, data) => {
  try {
    return axios.put(`todo/${id}`, data);
  } catch (error) {
    console.log('Error from service with error: ', error);
  }
}

const deleteTodo = async (id) => {
  try {
    return axios.delete(`todo/${id}`);
  } catch (error) {
    console.log('Error from service with error: ', error);
  }
}

export {getATodo, createNewTodo, deleteTodo, updateCurrentTodo}