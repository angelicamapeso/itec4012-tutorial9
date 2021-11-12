import "./styles.css";

export const Button = (props) => {
  const { isDisabled, action, type, text } = props;

  return (
    <button
      onClick={action}
      disabled={isDisabled}
      type={type}
      className={type}
    >
      {text}
    </button>
  );
}