import Button from '../Button/Button';
import './Todo.css';

const Todo = ( props ) => {
  const { todo, completeTodo, removeTodo } = props;
  return (
    <div className='todo' >
      <div className={ todo.isCompleted ? 'complete' : '' }>{ todo.title }</div>
      <div className="group-btn">
        <Button onClick={ () => completeTodo( todo ) } text='Complete' />
        <Button onClick={ () => removeTodo( todo ) } text='X' />
      </div>
    </div>
  );
};

export default Todo;