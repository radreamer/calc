import "./style.css";

interface DisplayInputProps {
  value: string;
}

function DisplayInput({ value }: DisplayInputProps) {
  return <div className="display-input">{value}</div>;
}

export default DisplayInput;
