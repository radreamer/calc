import Button from "../_shared/components/Button";

import "./style.css";

interface DigitButtonsProps {
  handleDigit: (num: number) => void;
  handleDivider: () => void;
}

function DigitButtons({ handleDigit, handleDivider }: DigitButtonsProps) {
  return (
    <div>
      {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((n) => {
        return (
          <Button
            key={n}
            className="digit-button"
            onClick={() => handleDigit(n)}
            style={n === 0 ? { width: "calc(var(--width) / 2)" } : {}}
          >
            {n}
          </Button>
        );
      })}
      <Button className="digit-button" onClick={() => handleDivider()}>
        ,
      </Button>
    </div>
  );
}

export default DigitButtons;
