import { Layer, Rect, Stage } from "react-konva";
import { useWindowSize } from "@uidotdev/usehooks";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import KonvaGrid from "./KonvaGrid";
import KonvaGridAxis from "./KonvaGridAxis";

type KonvaWrapperProps = {};

const KonvaWrapper = (props: KonvaWrapperProps) => {
  const windowSize = useWindowSize();
  const [mainLayerScale, setMainLayerScale] = useState(1);
  const [mainLayerPos, setMainLayerPos] = useState({ x: 100, y: 50 });
  const [mainLayerIsDraggable, setMainLayerIsDraggable] = useState(false);

  const handleDrag = (event: KonvaEventObject<DragEvent>) => {
    setMainLayerPos({
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
    const layer = e.currentTarget;
    const oldScale = layer.scaleX();
    const pointer = stage.getPointerPosition();
    if (pointer === null) return;
    const mousePointsTo = {
      x: stage.getPointerPosition()!.x / oldScale - layer.x() / oldScale,
      y: stage.getPointerPosition()!.y / oldScale - layer.y() / oldScale,
    };
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale < minScale || newScale > maxScale) return;
    setMainLayerScale(newScale);
    setMainLayerPos({
      x:
        -(mousePointsTo.x - stage.getPointerPosition()!.x / newScale) *
        newScale,
      y:
        -(mousePointsTo.y - stage.getPointerPosition()!.y / newScale) *
        newScale,
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Alt") return;
    setMainLayerIsDraggable(true);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key !== "Alt") return;
    setMainLayerIsDraggable(false);
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
    <Stage width={windowSize.width || 0} height={windowSize.height || 0}>
      <Layer
        draggable={mainLayerIsDraggable}
        onDragMove={handleDrag}
        onWheel={handleWheel}
        scaleX={mainLayerScale}
        scaleY={mainLayerScale}
        x={mainLayerPos.x}
        y={mainLayerPos.y}
      >
        <KonvaGrid
          cellSize={50}
          minimumVisibleX={(-1 * mainLayerPos.x) / mainLayerScale}
          maximumVisibleX={
            (-1 * mainLayerPos.x + windowSize.width!) / mainLayerScale
          }
          minimumVisibleY={(-1 * mainLayerPos.y) / mainLayerScale}
          maximumVisibleY={
            (-1 * mainLayerPos.y + windowSize.height!) / mainLayerScale
          }
        />
        <Rect height={50} width={100} fill="black" x={0} y={0} stroke="white" />
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
      <KonvaGridAxis
        cellSize={50}
        scale={mainLayerScale}
        xOffset={-1 * mainLayerPos.x}
        yOffset={-1 * mainLayerPos.y}
        minimumVisibleX={(-1 * mainLayerPos.x) / mainLayerScale}
        maximumVisibleX={
          (-1 * mainLayerPos.x + windowSize.width!) / mainLayerScale
        }
        minimumVisibleY={(-1 * mainLayerPos.y) / mainLayerScale}
        maximumVisibleY={
          (-1 * mainLayerPos.y + windowSize.height!) / mainLayerScale
        }
        stageHeight={windowSize.height!}
        stageWidth={windowSize.width!}
      />
    </Stage>
  );
};

export default KonvaWrapper;
