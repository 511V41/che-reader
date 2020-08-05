import React, { useRef, useEffect } from "react";
import { Emblem as EmblemData } from "../models/team";

type Props = {
  emblemData?: EmblemData;
};

const Emblem: React.FC<Props> = (props: Props) => {
  if (!props.emblemData) {
    return <div></div>;
  }
  // eslint-disable-next-line
  const canvas: any = useRef(null);
  const size = 32;
  const magnification = size / 32;
  useEffect(() => {
    if (!props.emblemData) {
      return;
    }
    const context = canvas.current.getContext("2d");
    context.save();
    const pixels = props.emblemData.image.split("");
    for (let y = 0; y < 32; y += 1) {
      for (let x = 0; x < 32; x += 1) {
        const index = x + y * 32;
        const pixel = pixels[index];
        const color = props.emblemData.colorPalette[parseInt(pixel, 16)];
        const r = (color.r / 200) * 255;
        const g = (color.g / 200) * 255;
        const b = (color.b / 200) * 255;
        const a = color.a / 255;
        context.fillStyle = `rgba(${r},${g},${b},${a})`;
        context.fillRect(
          x * magnification,
          y * magnification,
          magnification,
          magnification
        );
      }
    }
    context.restore();
  });
  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvas} width={size} height={size}></canvas>
    </div>
  );
};

export default Emblem;
