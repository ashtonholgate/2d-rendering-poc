import { convertXYCoordinatesToGridRef } from "@/utilities/grid.utilities";
import { roundToNearest } from "@/utilities/number.utilities";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rect } from "react-konva";

type KonvaWrapperProps = {
  cellSize: number;
  minimumVisibleX: number;
  maximumVisibleX: number;
  minimumVisibleY: number;
  maximumVisibleY: number;
};

const KonvaGrid = ({
  cellSize,
  minimumVisibleX,
  maximumVisibleX,
  minimumVisibleY,
  maximumVisibleY,
}: KonvaWrapperProps) => {
  let [cells, setCells] = useState<JSX.Element[]>([]);

  const generateGridCell = (cellSize: number, x: number, y: number) => (
    <Rect
      key={convertXYCoordinatesToGridRef(x, y, cellSize)}
      x={x}
      y={y}
      width={cellSize}
      height={cellSize}
      stroke="#222"
    />
  );

  const handleGridCellGeneration = useCallback(
    (
      cellSize: number,
      minimumVisibleX: number,
      maximumVisibleX: number,
      minimumVisibleY: number,
      maximumVisibleY: number
    ) => {
      const newCells: JSX.Element[] = [];
      const startX = roundToNearest(minimumVisibleX, cellSize, "floor") - cellSize;
      const endX = roundToNearest(maximumVisibleX, cellSize, "ceil") + cellSize;
      const startY = roundToNearest(minimumVisibleY, cellSize, "floor") - cellSize;
      const endY = roundToNearest(maximumVisibleY, cellSize, "ceil") + cellSize;
      let xCounter = startX;
      let yCounter = startY;
      while (yCounter < endY) {
        while (xCounter < endX) {
          newCells.push(generateGridCell(cellSize, xCounter, yCounter));
          xCounter += cellSize;
        }
        xCounter = startX;
        yCounter += cellSize;
      }
      setCells(newCells);
    },
    []
  );

  useEffect(() => {
    handleGridCellGeneration(
      cellSize,
      minimumVisibleX,
      maximumVisibleX,
      minimumVisibleY,
      maximumVisibleY
    );
  }, [
    cellSize,
    minimumVisibleX,
    maximumVisibleX,
    minimumVisibleY,
    maximumVisibleY,
    handleGridCellGeneration,
  ]);

  return cells;
};

export default KonvaGrid;
