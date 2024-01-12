"use client"
import React, { useCallback } from "react";
import { Graphics } from "@pixi/react";
import { Graphics as GraphicsType } from "pixi.js";

type RectangleProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const Rectangle = (props: RectangleProps) => {
  const draw = useCallback(
    (g: GraphicsType) => {
      g.clear();
      g.lineStyle(1, "#fff", 1);
      g.drawRect(props.x, props.y, props.width, props.height);
    },
    [props]
  );

  return <Graphics draw={draw} />;
};
