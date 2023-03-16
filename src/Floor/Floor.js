import React, { useState } from "react";
import Button from "./Button";
import Level from "./Level";
import ElevatorBox from "../Elevator/ElevatorBox";
import "./Floor.css";

const Floor = ({
  floor,
  numOfElevators,
  elevators,
  onClick,
  onTransitionEnd,
}) => {
  const roomsFloor = Array.from(
    { length: numOfElevators },
    (_, index) => index
  );

  return (
    <tbody>
      <tr key={floor.level}>
        <Level floor={floor} />

        {roomsFloor.map((room) => (
          <ElevatorBox
            key={room}
            elevator={elevators.find((elevator) => elevator.id === room)}
            boxId={room}
            onTransitionEnd={onTransitionEnd}
          />
        ))}

        <Button floor={floor} onClick={onClick} />
      </tr>
    </tbody>
  );
};

export default Floor;
