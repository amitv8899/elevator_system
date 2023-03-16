import React from "react";
import "./Floor.css";

const Button = ({ floor, onClick }) => {
  const btnClass =
    floor.buttonState === 0
      ? "btnCall"
      : floor.buttonState === 1
      ? "btnWaitng"
      : "btnArrived";
  const btnLabel =
    floor.buttonState === 0
      ? "Call"
      : floor.buttonState === 1
      ? "Waiting"
      : "Arrived";

  return (
    <td>
      <button
        className={`buttonLevel ${btnClass}`}
        id={floor.level}
        onClick={(e) => {
          onClick(e);
        }}
      >
        {btnLabel}
      </button>
    </td>
  );
};

export default Button;
