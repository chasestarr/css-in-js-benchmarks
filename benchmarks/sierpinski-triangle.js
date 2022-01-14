// references https://github.com/necolas/react-native-web/tree/48da9814e7fe7ccc625d713c73bb6c1c4ce861b7/packages/benchmarks

import * as React from "react";
import {
  interpolatePurples,
  interpolateBuPu,
  interpolateRdPu,
} from "d3-scale-chromatic";

const targetSize = 10;

export function SierpinskiTriangle({
  components,
  x,
  y,
  depth = 0,
  testID = 0,
  s,
}) {
  const { Dot } = components;
  if (Dot) {
    if (s <= targetSize) {
      let fn;
      switch (depth) {
        case 1:
          fn = interpolatePurples;
          break;
        case 2:
          fn = interpolateBuPu;
          break;
        case 3:
        default:
          fn = interpolateRdPu;
      }

      // introduce randomness to ensure that repeated runs don't produce the same colors
      const color = fn((testID * Math.random()) / 20);
      return (
        <Dot
          color={color}
          size={targetSize}
          x={x - targetSize / 2}
          y={y - targetSize / 2}
        />
      );
    }

    s /= 2;

    return (
      <React.Fragment>
        <SierpinskiTriangle
          components={components}
          depth={1}
          testID={testID}
          s={s}
          x={x}
          y={y - s / 2}
        />
        <SierpinskiTriangle
          components={components}
          depth={2}
          testID={testID}
          s={s}
          x={x - s}
          y={y + s / 2}
        />
        <SierpinskiTriangle
          components={components}
          depth={3}
          testID={testID}
          s={s}
          x={x + s}
          y={y + s / 2}
        />
      </React.Fragment>
    );
  } else {
    return <span style={{ color: "white" }}>No implementation available</span>;
  }
}
