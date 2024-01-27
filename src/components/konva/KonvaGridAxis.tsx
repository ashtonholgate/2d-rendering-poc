import { convertCoordinateToRef } from "@/utilities/grid.utilities";
import { roundToNearest } from "@/utilities/number.utilities";
import { useCallback, useEffect, useRef } from "react";
import { Group, Layer, Rect, Text } from "react-konva";

type KonvaGridAxisProps = {
  cellSize: number;
  scale: number;
  xOffset: number;
  yOffset: number;
  minimumVisibleX: number;
  maximumVisibleX: number;
  minimumVisibleY: number;
  maximumVisibleY: number;
  stageWidth: number;
  stageHeight: number;
};

const KonvaGridAxis = ({
  cellSize,
  scale,
  xOffset,
  yOffset,
  minimumVisibleX,
  maximumVisibleX,
  minimumVisibleY,
  maximumVisibleY,
  stageWidth,
  stageHeight,
}: KonvaGridAxisProps) => {
  const xAxisLabels = useRef<JSX.Element[]>([]);
  const yAxisLabels = useRef<JSX.Element[]>([]);
  const generateXAxisLabel = useCallback(
    (cellSize: number, x: number, xOffset: number) => {
      const xVal = (-1 * xOffset) + roundToNearest(x, 50, "floor");
      return (
        <Group
          key={convertCoordinateToRef(x, "x", cellSize)}
          x={xVal}
          y={stageHeight - 50}
          width={cellSize}
          height={cellSize}
        >
          <Text
            width={cellSize}
            height={cellSize}
            fill={"white"}
            text={convertCoordinateToRef(x, "x", cellSize)}
            align="center"
            verticalAlign="middle"
          />
        </Group>
      );
    },
    [stageHeight]
  );

  const generateYAxisLabel = useCallback(
    (cellSize: number, y: number, yOffset: number) => {
      const yVal = (-1 * yOffset) + roundToNearest(y, 50, "floor");
      return (
        <Group
          key={convertCoordinateToRef(y, "y", cellSize)}
          x={0}
          y={yVal}
          width={cellSize}
          height={cellSize}
        >
          <Text
            width={cellSize}
            height={cellSize}
            fill={"white"}
            text={convertCoordinateToRef(y, "y", cellSize)}
            align="center"
            verticalAlign="middle"
          />
        </Group>
      );
    },
    []
  );

  useEffect(() => {
    const newXLabels: JSX.Element[] = [];
    const newYLabels: JSX.Element[] = [];
    let xCounter = minimumVisibleX;
    let yCounter = minimumVisibleY;
    while (xCounter < maximumVisibleX) {
      newXLabels.push(generateXAxisLabel(cellSize, xCounter, xOffset));
      xCounter += cellSize;
    }
    while (yCounter < maximumVisibleY) {
      newYLabels.push(generateYAxisLabel(cellSize, yCounter, yOffset));
      yCounter += cellSize;
    }
    xAxisLabels.current = newXLabels;
    yAxisLabels.current = newYLabels;
  }, [
    cellSize,
    scale,
    xOffset,
    yOffset,
    minimumVisibleX,
    maximumVisibleX,
    minimumVisibleY,
    maximumVisibleY,
    stageWidth,
    stageHeight,
    generateXAxisLabel,
    generateYAxisLabel,
  ]);

  return (
    <Layer>
      <Rect x={0} y={0} width={50} height={stageHeight} fill="black" />
      <Rect
        x={0}
        y={stageHeight - 50}
        width={stageWidth}
        height={50}
        fill="black"
      />

      {xAxisLabels.current}
      {yAxisLabels.current}

      <Rect x={0} y={stageHeight - 50} width={50} height={50} fill="black" />
      <Rect
        x={50}
        y={0}
        width={stageWidth - 50}
        height={stageHeight - 50}
        stroke="white"
        listening={false}
      />
    </Layer>
  );
};

export default KonvaGridAxis;
