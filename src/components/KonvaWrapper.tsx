import { Layer, Rect, Stage } from "react-konva";
import { useWindowSize } from "@uidotdev/usehooks";
import { KonvaEventObject } from "konva/lib/Node";
import { useState } from "react";

type KonvaWrapperProps = {};

const KonvaWrapper = (props: KonvaWrapperProps) => {
  const windowSize = useWindowSize();
  const [scale, setScale] = useState(1);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.1;
    const stage = e.target.getStage();
    if (stage === null) return;
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);
    setStageX(
      -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) * newScale
    );
    setStageY(
      -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) * newScale
    );
  };

  return (
    <Stage
      width={windowSize.width || 0}
      height={windowSize.height || 0}
      draggable
      onWheel={handleWheel}
      scaleX={scale}
      scaleY={scale}
      x={stageX}
      y={stageY}
    >
      <Layer>
        <Rect height={100} width={200} x={0} y={0} stroke="white" />
        <Rect height={100} width={200} x={200} y={0} stroke="white" />
        <Rect height={100} width={200} x={400} y={0} stroke="white" />
        <Rect height={100} width={200} x={0} y={300} stroke="white" />
        <Rect height={100} width={200} x={200} y={300} stroke="white" />
        <Rect height={100} width={200} x={400} y={300} stroke="white" />
      </Layer>
    </Stage>
  );
};

export default KonvaWrapper;
