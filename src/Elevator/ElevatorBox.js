import React from "react";
import Elevator from "./Elevator";

const ElevatorBox = ({
  elevator,
  boxId,
  enterElevator,

  onTransitionEnd,
}) => {
  return (
    <th className="elevatorBox" key={boxId}>
      {elevator ? (
        <Elevator elevator={elevator} onTransitionEnd={onTransitionEnd} />
      ) : null}
    </th>
  );
};

export default ElevatorBox;
