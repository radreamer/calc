import { useCallback, useEffect, useState } from "react";

import { Operator } from "../_shared/types/operator.type";
import DisplayInput from "../DisplayInput";
import UtilityButtons from "../UtilityButtons";
import DigitButtons from "../DigitButtons";
import OperatorButtons from "../OperatorButtons";

import "./style.css";

const DEFAULT_INPUT = "0";

function App() {
  const [startNew, setStartNew] = useState<boolean>(false);
  const [input, setInput] = useState<string>(DEFAULT_INPUT);
  const [tempOperand, setTempOperand] = useState<number>();
  const [operand, setOperand] = useState<number>();
  const [operator, setOperator] = useState<Operator>();

  const handleDigit = useCallback(
    (num: number) => {
      if (startNew || input === DEFAULT_INPUT) {
        setInput(`${num}`);
        setStartNew(false);
      } else {
        setInput(`${input}${num}`);
      }
    },
    [input, startNew]
  );

  const handleDivider = useCallback(() => {
    const DIVIDER = ".";

    if (input.includes(DIVIDER)) {
      console.warn("number is float already");
    } else {
      setInput(`${input}${DIVIDER}`);
    }
  }, [input]);

  const handleSign = () => {
    if (input === DEFAULT_INPUT) return;

    const isNegative = input.includes("-");

    if (isNegative) {
      setInput(input.slice(1));
    } else {
      setInput(`-${input}`);
    }
  };

  const handleOperator = useCallback(
    (operator: Operator) => {
      setOperand(Number(input));
      setTempOperand(undefined);
      setOperator(operator);
      setStartNew(true);
    },
    [input]
  );

  const handleReset = () => {
    setInput(DEFAULT_INPUT);
    setOperand(undefined);
    setTempOperand(undefined);
    setOperator(undefined);
  };

  const handleDelete = useCallback(() => {
    if (input.length > 1) {
      setInput(input.slice(0, -1));
    } else {
      setInput(DEFAULT_INPUT);
    }
  }, [input]);

  const handleEqual = useCallback(() => {
    if (input && operator && typeof operand !== "undefined") {
      let res;
      const inputNum = parseFloat(input);

      if (!tempOperand) {
        setTempOperand(inputNum);
      }

      switch (operator) {
        case Operator["+"]:
          res = tempOperand ? inputNum + tempOperand : operand + inputNum;
          break;
        case Operator["-"]:
          res = tempOperand ? inputNum - tempOperand : operand - inputNum;
          break;
        case Operator["*"]:
          res = tempOperand ? inputNum * tempOperand : operand * inputNum;
          break;
        case Operator["/"]:
          res = tempOperand ? inputNum / tempOperand : operand / inputNum;
          break;
        default:
          res = inputNum;
      }

      setInput(Number.isFinite(res) ? String(res) : "0");
    }
  }, [input, operand, operator, tempOperand]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const num = parseInt(e.key);

      if (Number.isInteger(num)) {
        handleDigit(num);
      }

      if (e.key === "." || e.key === ",") {
        handleDivider();
      }

      if (e.key === "Backspace") {
        handleDelete();
      }

      if (e.key === "Escape") {
        handleReset();
      }

      if (["+", "-", "/", "*"].includes(e.key)) {
        handleOperator(e.key as Operator);
      }

      if (e.key === "=" || e.key === "Enter") {
        handleEqual();
      }
    },
    [handleDigit, handleDivider, handleDelete, handleOperator, handleEqual]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="wrapper">
      <DisplayInput value={input} />
      <div className="button-wrapper">
        <div className="digits-wrapper">
          <UtilityButtons
            handleReset={handleReset}
            handleSign={handleSign}
            handleDelete={handleDelete}
          />
          <DigitButtons
            handleDigit={handleDigit}
            handleDivider={handleDivider}
          />
        </div>
        <OperatorButtons
          handleOperator={handleOperator}
          handleEqual={handleEqual}
        />
      </div>
    </div>
  );
}

export default App;
