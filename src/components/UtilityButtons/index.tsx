import Button from "../_shared/components/Button";

import "./style.css";

interface UtilityButtonsProps {
  handleReset: () => void;
  handleSign: () => void;
  handleDelete: () => void;
}

function UtilityButtons({
  handleReset,
  handleSign,
  handleDelete,
}: UtilityButtonsProps) {
  return (
    <div>
      <Button className="utility-button" onClick={() => handleReset()}>
        AC
      </Button>
      <Button className="utility-button" onClick={() => handleSign()}>
        +/-
      </Button>
      <Button className="utility-button" onClick={() => handleDelete()}>
        Del
      </Button>
    </div>
  );
}

export default UtilityButtons;
