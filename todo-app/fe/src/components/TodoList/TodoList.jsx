import { useEffect, useState } from "react";
import { createNewTodo, deleteTodo, getATodo, updateCurrentTodo } from "../../services/todoServies";
import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";
import createUUID from "../../config/createUUID";
import './TodoList.css'

const TodoList = () => {
  const limit = 6;
  const [ todos, setTodos ] = useState( [] );
  const [ fetching, setFetching ] = useState( false );
  const addTodo = async ( title ) => {
    let newTodo = {
      id: createUUID(),
      title,
      userId: createUUID(),
      completed: false
    }

    const res = await createNewTodo( newTodo );
    if ( res && res.success === true ) {
      // setFetching( true );
    }
  };

  const completeTodo = todo => {
    const { id } = todo;
    updateCurrentTodo( id, { completed: true } );
  };

  const removeTodo = todo => {
    const { id } = todo;
    deleteTodo( id );
    setFetching( true )
  };

  const getTodos = async () => {
    try {
      const res = await getATodo( limit );
      if ( res ) {
        setTodos( res.data );
      }
    } catch ( error ) {
      console.error( "Error with message ", error.message );
      throw error;
    }
  }

  useEffect( () => {
    getTodos();
  }, [ fetching ] )
  return (
    <div className='todo-list'>
      <TodoForm addTodo={ addTodo } />

      { todos && todos.length > 0 &&
        todos.map( ( todo ) => (
          <Todo
            key={ todo.id }
            todo={ todo }
            completeTodo={ completeTodo }
            removeTodo={ removeTodo }
          />
        ) ) }
    </div>
  )
}

export default TodoList;