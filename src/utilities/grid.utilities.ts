import { roundToNearest } from "./number.utilities";

export const convertXYCoordinatesToGridRef = (
  x: number,
  y: number,
  cellSize: number
) => {
  return `${convertCoordinateToRef(x, "x", cellSize)}•${convertCoordinateToRef(
    y,
    "y",
    cellSize
  )}`;
};

export const convertCoordinateToRef = (
  coordinate: number,
  type: "x" | "y",
  cellSize: number,
) => {
  return `${type.toUpperCase()}${coordinate < 0 ? "-" : ""}${(
    Math.abs(roundToNearest(coordinate, 50, "floor")) / cellSize
  )
    .toString()
    .padStart(3, "0")}`;
};
