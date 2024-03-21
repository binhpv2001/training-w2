import {useEffect, useState} from "react";
import {createNewTodo, deleteTodo, getATodo, updateCurrentTodo} from "../../services/todoServies";
import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";
import './TodoList.css'

const TodoList = () => {
  const limit = 6;
  const [todos, setTodos] = useState([]);
  const addTodo = async (title) => {
    if (title) {
      const res = await createNewTodo({title});
      if (res?.success === true) {
        setTodos([...todos, res.data])
      }
    }
  };

  const completeTodo = async (todo) => {
    const {id} = todo;
    const res = await updateCurrentTodo(id, {isCompleted: true});
    if (res?.success === true) {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === res.data) {
            return {...todo, isCompleted: true};
          }
          return todo;
        })
      );
    }
  };

  const removeTodo = async (todo) => {
    const {id} = todo;
    const res = await deleteTodo(id);
    if (res?.success === true) {
      setTodos((prev) => prev.filter((item) => item.id !== res.data));
    }
  };

  const getTodos = async () => {
    try {
      const res = await getATodo(limit);
      if (res) {
        setTodos(res.data);
      }
    } catch (error) {
      console.error("Error with message ", error.message);
      throw error;
    }
  }

  useEffect(() => {
    getTodos();
  }, [])
  return (
    <div className='todo-list'>
      <TodoForm addTodo={addTodo} />

      {todos && todos.length > 0 &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
    </div>
  )
}

export default TodoList;