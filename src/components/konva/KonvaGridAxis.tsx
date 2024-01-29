import { convertCoordinateToRef } from "@/utilities/grid.utilities";
import { roundToNearest } from "@/utilities/number.utilities";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [xAxisLabels, setXAxisLabels] = useState<JSX.Element[]>([]);
  const [yAxisLabels, setYAxisLabels] = useState<JSX.Element[]>([]);
  const generateXAxisLabel = useCallback(
    (cellSize: number, x: number, xOffset: number, scale: number) => {
      const xVal = -1 * xOffset + (roundToNearest(x, cellSize, "floor") * scale);
      return (
        <Group
          key={convertCoordinateToRef(x, "x", cellSize)}
          x={xVal}
          y={stageHeight - 45}
          width={cellSize}
          height={20}
          scaleX={scale}
          scaleY={scale}
        >
          <Text
            width={cellSize}
            height={20}
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
    (cellSize: number, y: number, yOffset: number, scale: number) => {
      const yVal = -1 * yOffset + (roundToNearest(y, 50, "floor") * scale);
      return (
        <Group
          key={convertCoordinateToRef(y, "y", cellSize)}
          x={cellSize - 5}
          y={yVal}
          width={cellSize}
          height={20}
          scaleX={scale}
          scaleY={scale}
          rotation={90}
          
        >
          <Text
            width={cellSize}
            height={20}
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
    let xCounter = minimumVisibleX - cellSize;
    let yCounter = minimumVisibleY - cellSize;
    while (xCounter < maximumVisibleX + cellSize) {
      newXLabels.push(generateXAxisLabel(cellSize, xCounter, xOffset, scale));
      xCounter += cellSize;
    }
    while (yCounter < maximumVisibleY + cellSize) {
      newYLabels.push(generateYAxisLabel(cellSize, yCounter, yOffset, scale));
      yCounter += cellSize;
    }
    setXAxisLabels(newXLabels);
    setYAxisLabels(newYLabels);
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
    <Layer listening={false}>
      <Rect x={0} y={0} width={50} height={stageHeight} fill="black" />
      <Rect
        x={0}
        y={stageHeight - 50}
        width={stageWidth}
        height={50}
        fill="black"
      />

      {xAxisLabels}
      {yAxisLabels}

      <Rect x={0} y={stageHeight - 50} width={50} height={50} fill="black" />
      <Rect
        x={50}
        y={0}
        width={stageWidth - 51}
        height={stageHeight - 51}
        stroke="white"
      />
    </Layer>
  );
};

export default KonvaGridAxis;
