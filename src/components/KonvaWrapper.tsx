import { Layer, Rect, Stage } from "react-konva";
import { useWindowSize } from "@uidotdev/usehooks";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import KonvaGrid from "./KonvaGrid";

type KonvaWrapperProps = {};

const KonvaWrapper = (props: KonvaWrapperProps) => {
  const windowSize = useWindowSize();
  const [scale, setScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [draggable, setDraggable] = useState(true);

  const handleDrag = (event: KonvaEventObject<DragEvent>) => {
    setStagePos({
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.1;
    const minScale = 0.5;
    const maxScale = 2.5;
    const stage = e.target.getStage();
    if (stage === null) return;
    const pointer = stage.getPointerPosition();
    if (pointer === null) return;
    const oldScale = stage.scaleX();
    const pointerPointsTo = {
      x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
    };
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale < minScale || newScale > maxScale) return;
    setScale(newScale);
    setStagePos({
      x: -(pointerPointsTo.x - stage.getPointerPosition()!.x / newScale) * newScale,
      y: -(pointerPointsTo.y - stage.getPointerPosition()!.y / newScale) * newScale
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // if (event.key !== "Meta") return;
    // setDraggable(true);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    // if (event.key !== "Meta") return;
    // setDraggable(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Stage
      width={windowSize.width || 0}
      height={windowSize.height || 0}
      draggable={draggable}
      onDragMove={handleDrag}
      onWheel={handleWheel}
      scaleX={scale}
      scaleY={scale}
      x={stagePos.x}
      y={stagePos.y}
    >
      <Layer>
      <KonvaGrid
        cellSize={50}
        minimumVisibleX={(-1 * stagePos.x) / scale}
        maximumVisibleX={(-1 * stagePos.x + windowSize.width!) / scale}
        minimumVisibleY={(-1 * stagePos.y) / scale}
        maximumVisibleY={(-1 * stagePos.y + windowSize.height!) / scale}
      />
        <Rect
          height={50}
          width={100}
          fill="black"
          x={0}
          y={0}
          stroke="white"
        />
        <Rect
          height={50}
          width={100}
          fill="black"
          x={100}
          y={0}
          stroke="white"
        />
        <Rect
          height={50}
          width={100}
          fill="black"
          x={200}
          y={0}
          stroke="white"
        />
        <Rect
          height={50}
          width={100}
          fill="black"
          x={0}
          y={150}
          stroke="white"
        />
        <Rect
          height={50}
          width={100}
          fill="black"
          x={100}
          y={150}
          stroke="white"
        />
        <Rect
          height={50}
          width={100}
          fill="black"
          x={200}
          y={150}
          stroke="white"
        />
      </Layer>
    </Stage>
  );
};

export default KonvaWrapper;
