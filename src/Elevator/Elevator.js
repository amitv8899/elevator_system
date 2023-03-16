import React from "react";

import { ReactComponent as ElevatorIconImage } from "./icons8-elevator.svg";
import "./Elevator.css";

const Elevator = ({ elevator, onTransitionEnd }) => {
  const elevatorState =
    elevator.workingState === 0
      ? "black"
      : elevator.workingState === 1
      ? "red"
      : "green";

  return (
    <ElevatorIconImage
      className="elevatorImage"
      id={elevator.id}
      fill={elevatorState}
      onTransitionEnd={(e) => {
        onTransitionEnd(e);
      }}
      style={{ position: "relative", top: `${elevator.position}rem` }}
    />
  );
};

export default Elevator;
