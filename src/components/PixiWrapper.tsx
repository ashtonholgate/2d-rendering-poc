"use client";
import { Stage, Sprite, Container, Text } from "@pixi/react";
import InteractiveViewport from "./InteractiveViewport";
import { Rectangle } from "./Rectangle";
import { useWindowSize } from "@uidotdev/usehooks";

type PixiWrapperProps = {};

const PixiWrapper = (props: PixiWrapperProps) => {
  const windowSize = useWindowSize();

  return (
    <Stage width={windowSize.width || 0} height={windowSize.height || 0} options={{antialias: true}}>
      <InteractiveViewport>
          <Rectangle height={100} width={200} x={0} y={0} />
          <Rectangle height={100} width={200} x={200} y={0} />
          <Rectangle height={100} width={200} x={400} y={0} />
          <Rectangle height={100} width={200} x={0} y={300} />
          <Rectangle height={100} width={200} x={200} y={300} />
          <Rectangle height={100} width={200} x={400} y={300} />
      </InteractiveViewport>
    </Stage>
  );
};

export default PixiWrapper;
