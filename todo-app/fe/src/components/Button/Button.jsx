import './Button.css';

const Button = ({onClick, value, text, className}) => {

  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <button
      className={`custom-btn ${className}`}
      onClick={() => handleClick()}>
      {text}
    </button>
  );
};

export default Button;
