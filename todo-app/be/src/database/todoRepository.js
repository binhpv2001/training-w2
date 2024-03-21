const fs = require('fs');
const {data: todoes} = require('./todo.json');

const sortData = async (sort) => {
  return await todoes.sort((a, b) => sort === 'asc'
    ? new Date(a.id) - new Date(b.id)
    : new Date(b.id) - new Date(a.id));
}

const limitData = (listTodo, limit) => {
  const result = listTodo.slice(0, limit);
  return result;
}

const fetchListTodo = async ({limit, sort}) => {
  try {
    if (sort) {
      const sortedTodo = await sortData(sort);
      if (limit) {
        const result = limitData(sortedTodo, limit);
        return result;
      }
      return sortedTodo;
    }
    if (limit) {
      const result = limitData(todoes, limit);
      return result;
    }
  } catch (error) {
    console.log("Error from  repository with error: ", error);
  }
}

const fetchAllTodo = () => {
  try {
    return todoes;
  } catch (error) {
    console.log("Error from  repository with error: ", error);
  }
}

const fetchTodoById = (id) => {
  try {
    const todo = todoes.find(product => product.id === id);
    if (todo) {
      return todo;
    }
    return `Not found todo with id: ${id}`;
  } catch (error) {
    console.log("Error from  repository with error: ", error);
  }
}

const createTodo = (rawData) => {
  try {
    const newTodo = {
      id: Date.now(),
      isCompleted: false,
      ...rawData,
    }
    const newListTodos = [newTodo, ...todoes];
    fs.writeFileSync('./src/database/todo.json',
      JSON.stringify({data: newListTodos}, null, 2));
    return newTodo;
  } catch (error) {
    console.log("Error from  repository with error: ", error);
  }
}

const updateTodo = (id, data) => {
  try {
    const updatedData = todoes.map(todo => {
      if (todo.id === id) {
        const result = {...todo, ...data};
        return result;
      }
      return todo;
    });
    fs.writeFileSync('./src/database/todo.json',
      JSON.stringify({data: updatedData}, null, 2));
    if (updatedData) return id;
  } catch (error) {
    console.log("Error from  repository with error: ", error);
  }
}

const deleteTodo = (id) => {
  try {
    const todo = fetchTodoById(id);
    if (todo) {
      const deletedProduct = todoes.filter(item => item.id !== id);
      fs.writeFileSync('./src/database/todo.json', JSON.stringify({data: deletedProduct}, null, 2));
      return id;
    }
    return `Todo not found!`;
  } catch (error) {
    console.log("Error from  repository with error: ", error);
  }
}

module.exports = {
  fetchAllTodo,
  fetchListTodo,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
