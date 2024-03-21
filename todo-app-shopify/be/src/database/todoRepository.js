const fs = require('fs');
const {data: todos} = require('./todo.json');

const sortData = async (sort) => {
  return await todos.sort((a, b) => sort === 'asc'
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
  let listTodos = [...todos];
  return listTodos;
}

const fetchTodoById = (id) => {
  const todoById = todos.find(todo => todo.id === id);
  return todoById;
}

const createTodo = (rawData) => {
  try {
    const newTodo = {
      id: Date.now(),
      isCompleted: false,
      createdAt: new Date(),
      ...rawData,
    }
    const newListTodos = [newTodo, ...todos];
    fs.writeFileSync('./src/database/todo.json', JSON.stringify({
      data: newListTodos
    }, null, 2));
    return newTodo;
  } catch (error) {
    console.log('Error from repository with error: ', error);
  }
}

const updateTodo = (id, data) => {
  try {
    const newListTodo = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, ...data};
      }
      return todo;
    });
    fs.writeFileSync('./src/database/todo.json', JSON.stringify({data: newListTodo}, null, 2));
    if (newListTodo) return id;
  } catch (error) {
    console.log('Error from repository with error: ', error);
  }
}

const bulkUpdateTodo = (arrayId, action) => {
  try {
    const result = todos.map((todo) => {
      if (arrayId.includes(todo.id)) {
        return action === 'complete' ? {...todo, isCompleted: true}
          : {...todo, isCompleted: false}
      }
      return todo;
    })
    fs.writeFileSync('./src/database/todo.json', JSON.stringify({data: result}, null, 2));
    if (result) return arrayId;
  } catch (error) {
    console.log('Error from repository with error: ', error);
  }
}

const deleteTodo = async (id) => {
  try {
    let todo = await fetchTodoById(id);
    if (todo) {
      const newListTodo = todos.filter(todo => todo.id !== id);
      fs.writeFileSync('./src/database/todo.json', JSON.stringify({data: newListTodo}, null, 2));
      if (newListTodo) return id;
    }
    return 'Todo not found!';
  } catch (error) {
    console.log('Error from repository with error: ', error);
  }
}

const bulkDeleteTodo = (arrayId) => {
  try {
    const result = todos.filter(todo => !arrayId.includes(todo.id));
    fs.writeFileSync('./src/database/todo.json', JSON.stringify({data: result}, null, 2));
    if (result) return arrayId;
  } catch (error) {
    console.log('Error from repository with error: ', error);
  }
}

module.exports = {
  fetchAllTodo, fetchListTodo, fetchTodoById, createTodo, updateTodo,
  bulkUpdateTodo, deleteTodo, bulkDeleteTodo
};
