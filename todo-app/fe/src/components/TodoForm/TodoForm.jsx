import { useState } from "react";
import './TodoForm.css'
import Button from "../Button/Button";

const TodoForm = ( { addTodo } ) => {
  const [ value, setValue ] = useState( "" );

  const handleSubmit = () => {
    if ( !value ) return;
    addTodo( value );
    setValue( "" );
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        className="input-todo-form"
        value={ value }
        onChange={ e => setValue( e.target.value ) }
      />
      <Button className='add-btn' text='Add' onClick={ handleSubmit } />
    </div>
  );
}

export default TodoForm;