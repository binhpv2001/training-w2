import Button from '../Button/Button';
import './Todo.css';

const Todo = ({todo, completeTodo, removeTodo}) => {
  return (
    <div className='todo' >
      <div className={todo.isCompleted ? 'complete' : ''}>
        {todo.title}
      </div>
      <div className="group-btn">
        {todo?.isCompleted === false &&
          <Button
            onClick={() => completeTodo(todo)}
            text='Complete' />
        }
        <Button
          onClick={() => removeTodo(todo)}
          text='X' />
      </div>
    </div>
  );
};

export default Todo;