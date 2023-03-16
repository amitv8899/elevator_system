import React from "react";
import Elevator from "./Elevator";

const ElevatorBox = ({ elevator, onTransitionEnd }) => {
  return (
    <th className="elevatorBox">
      {elevator ? (
        <Elevator elevator={elevator} onTransitionEnd={onTransitionEnd} />
      ) : null}
    </th>
  );
};

export default ElevatorBox;
