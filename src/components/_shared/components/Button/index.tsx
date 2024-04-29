import "./style.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

function Button({ onClick, children, className, style }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => e.preventDefault()}
      type="button"
      className={`button ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
