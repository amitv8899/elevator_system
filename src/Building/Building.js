import React from "react";
import Floor from "../Floor/Floor";
import "./Building.css";
import { useState } from "react";
import sound from "./soundElevator.mp3";

import ManagerBuilding from "./ManagerBuilding";

const buttonLevelState = {
  call: 0,
  waiting: 1,
  arrived: 2,
};
const elevatorWorkState = {
  free: 0,
  moving: 1,
  arrived: 2,
};

const jobManager = new ManagerBuilding.module();
const Building = ({ numsFloor, numOfElevators }) => {
  const floorsArray = Array.from({ length: numsFloor }, (_, index) => ({
    level: index,
    buttonState: buttonLevelState.call,
    workingTime: null, //performance.now()
  }));
  const elevatorArray = Array.from({ length: numOfElevators }, (_, index) => ({
    id: index,
    workingState: elevatorWorkState.free,
    currrentFloor: 0,
    position: 0,
    nextFloor: -1,
    elevatorAudio: new Audio(sound),
  }));

  const [floors, setFloors] = useState(floorsArray.reverse());
  const [elevators, setElevators] = useState(elevatorArray);

  const setTimeouHandler = (elevatorId, chosenFloor) => {
    setTimeout(() => {
      const nextFloor = jobManager.removeNextJob();
      setElevators((currentState) => {
        if (nextFloor === undefined) {
          const newValue = currentState.map((elevator) =>
            elevator.id === elevatorId
              ? {
                  ...elevator,
                  workingState: elevatorWorkState.free,
                  position: 0,
                  nextFloor: -1,
                }
              : elevator
          );
          return newValue;
        }
        const updateElevators = currentState.map((elevator) =>
          elevator.id === elevatorId
            ? {
                ...elevator,
                workingState: elevatorWorkState.moving,
                position: (elevator.currrentFloor - nextFloor) * 4.18,
                nextFloor: nextFloor,
              }
            : elevator
        );
        return updateElevators;
      });
      setFloors((currentState) => {
        const newValue = currentState.map((floor) =>
          floor.level === chosenFloor
            ? { ...floor, buttonState: buttonLevelState.call }
            : floor
        );
        return newValue;
      });
    }, 2000);
  };

  const onClick = (buttom) => {
    const chosenFloor = parseInt(buttom.target.id);
    const ElevatorInFloor = elevators.find(
      (elevator) =>
        elevator.currrentFloor === chosenFloor &&
        elevator.workingState === elevatorWorkState.free
    );

    if (ElevatorInFloor !== undefined) {
      // there is already elevator in the floor
      const newElevators = elevators.map((elevator) =>
        elevator.id === ElevatorInFloor.id
          ? {
              ...elevator,
              workingState: elevatorWorkState.arrived,
              position: 0,
              nextFloor: -1,
            }
          : elevator
      );
      setElevators(newElevators);

      const newFloors = floors.map((floor) =>
        floor.level === chosenFloor
          ? {
              ...floor,
              buttonState: buttonLevelState.arrived,
            }
          : floor
      );
      setFloors(newFloors);
      setTimeouHandler(ElevatorInFloor.id, chosenFloor);
      return;
    }

    jobManager.addJob(chosenFloor);
    const newFloors = floors.map((floor) =>
      floor.level === chosenFloor
        ? {
            ...floor,
            buttonState: buttonLevelState.waiting,
            workingTime: performance.now(),
          }
        : floor
    );
    setFloors(newFloors);

    const freeElevatros = elevators.filter(
      (elevator) => elevator.workingState === elevatorWorkState.free
    );
    if (freeElevatros.length === 0) {
      return;
    }
    const elevatorForTheJobId = jobManager.removeJob(freeElevatros);
    const currFloor = elevators.find(
      (elevator) => elevator.id === elevatorForTheJobId
    ).currrentFloor;
    const newPositon = (currFloor - chosenFloor) * 4.18; // 4.18 (rem) is the gap between floors and if we get negative is up, posative is down
    const newElevators = elevators.map((elevator) =>
      elevator.id === elevatorForTheJobId
        ? {
            ...elevator,
            position: newPositon,
            workingState: elevatorWorkState.moving,
            nextFloor: chosenFloor,
          }
        : elevator
    );
    setElevators(newElevators);
  };

  const onTransitionEnd = (elevator) => {
    // elevatorAudio.play();

    const elevatorTraget = parseInt(elevator.target.id);
    elevators[elevatorTraget].elevatorAudio.play();
    // const newFloor = elevators.find(
    //   (elevator) => elevator.id === elevatorTraget
    // ).job;

    const arrivalFloor = elevators[elevatorTraget].nextFloor;

    console.log(
      `time to hnadle the floor is ${
        (performance.now() - floors[9 - (arrivalFloor + 1)].workingTime) / 1000
      } sec`
    ); // remember the floors index is reverse

    const newElevators = elevators.map((elevator) =>
      elevator.id === elevatorTraget
        ? {
            ...elevator,
            currrentFloor: arrivalFloor,
            workingState: elevatorWorkState.arrived,
            position: 0,
            nextFloor: -1,
          }
        : elevator
    );
    setElevators(newElevators);
    const newFloors = floors.map((floor) =>
      floor.level === arrivalFloor
        ? { ...floor, buttonState: buttonLevelState.arrived }
        : floor
    );
    setFloors(newFloors);
    setTimeouHandler(elevatorTraget, arrivalFloor);
  };

  return (
    <div>
      <header> Elevator Execrise</header>
      <table className="building">
        {floors.map((floor) => (
          <Floor
            key={floor.level}
            floor={floor}
            numOfElevators={numOfElevators}
            elevators={elevators.filter(
              (elevator) => elevator.currrentFloor === floor.level
            )}
            onClick={onClick}
            onTransitionEnd={onTransitionEnd}
          />
        ))}
      </table>
    </div>
  );
};

export default Building;
