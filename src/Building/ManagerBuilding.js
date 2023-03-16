class ManagerBuilding {
  constructor() {
    this.queueFloors = [];
  }
  addJob(newCall) {
    this.queueFloors.push(newCall);
  }
  removeJob(elevatorList = Array) {
    const newJob = this.queueFloors.shift();
    let elevatorForTheJobId = null;
    let diff = Infinity;

    elevatorList.forEach((elevator) => {
      let curDiff = Math.abs(elevator.currrentFloor - newJob);
      if (curDiff === 0) {
        return -1;
      }
      if (diff > curDiff) {
        diff = curDiff;
        elevatorForTheJobId = elevator.id;
      }
    });
    return elevatorForTheJobId;
  }
  isEmpty() {
    return this.queueFloors.length === 0;
  }
  removeNextJob() {
    return this.queueFloors.shift();
  }
}
module.exports.module = ManagerBuilding;
