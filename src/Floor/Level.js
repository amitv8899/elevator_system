import React from "react";
import "./Floor.css";

const Level = ({ floor }) => {
  const floorLevel =
    floor.level === 0
      ? "Ground Floor"
      : floor.level === 1
      ? `${floor.level}st`
      : `${floor.level}th`;

  return (
    <td key={floor.level} className="floorName">
      <label className="floorLabel">{floorLevel}</label>
    </td>
  );
};

export default Level;
