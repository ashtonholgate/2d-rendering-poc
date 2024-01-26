import { roundToNearest } from "@/utilities/number.utilities";
import { useCallback, useEffect, useRef } from "react";
import { Group, Layer, Rect } from "react-konva";

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
  let cells = useRef<JSX.Element[]>([]);

  const generateGridCell = (cellSize: number, x: number, y: number) => (
    <Rect
      key={`${x}-${y}`}
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
      const startX = roundToNearest(minimumVisibleX, 50, "floor");
      const endX = roundToNearest(maximumVisibleX, 50, "ceil");
      const startY = roundToNearest(minimumVisibleY, 50, "floor");
      const endY = roundToNearest(maximumVisibleY, 50, "ceil");
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
      cells.current = newCells;
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

  return cells.current;
};

export default KonvaGrid;
