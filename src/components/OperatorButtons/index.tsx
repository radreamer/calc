import { Operator } from "../_shared/types/operator.type";
import Button from "../_shared/components/Button";

import "./style.css";

interface OperatorButtonsProps {
  handleOperator: (operator: Operator) => void;
  handleEqual: () => void;
}

function OperatorButtons({
  handleOperator,
  handleEqual,
}: OperatorButtonsProps) {
  return (
    <div className="operator-wrapper">
      {Object.keys(Operator).map((operator) => (
        <Button
          key={operator}
          onClick={() =>
            operator === "="
              ? handleEqual()
              : handleOperator(operator as Operator)
          }
          className="operator-button"
        >
          {operator}
        </Button>
      ))}
    </div>
  );
}

export default OperatorButtons;
