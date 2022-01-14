import { Tree } from "./tree.js";
import { SierpinskiTriangle } from "./sierpinski-triangle.js";
import * as InlineStyles from "./inline-styles.js";
import * as StyledComponents from "./styled-components.js";
import * as StyletronAtomic from "./styletron-atomic.js";
import * as StyletronAtomicHooks from "./styletron-atomic-hooks.js";
import * as StyletronMonolithic from "./styletron-monolithic.js";
import * as StyletronMonolithicHooks from "./styletron-monolithic-hooks.js";

console.log(StyledComponents);

export const BenchmarkType = {
  MOUNT: "mount",
  MOUNT_WIDE: "mount wide",
  UPDATE: "update",
};

function cases(components) {
  return {
    [BenchmarkType.MOUNT]: {
      Provider: components.Provider,
      Component: Tree,
      componentProps: {
        breadth: 2,
        components,
        depth: 7,
        id: 0,
        wrap: 1,
      },
    },
    [BenchmarkType.MOUNT_WIDE]: {
      Provider: components.Provider,
      Component: Tree,
      componentProps: {
        breadth: 6,
        components,
        depth: 3,
        id: 0,
        wrap: 2,
      },
    },
    [BenchmarkType.UPDATE]: {
      Provider: components.Provider,
      Component: SierpinskiTriangle,
      componentProps: {
        components,
        s: 200,
        x: 0,
        y: 0,
      },
    },
  };
}

export default {
  "Inline Styles": cases(InlineStyles),
  "Styletron Atomic": cases(StyletronAtomic),
  "Styletron Atomic Hooks": cases(StyletronAtomicHooks),
  "Styletron Monolithic": cases(StyletronMonolithic),
  "Styletron Monolithic Hooks": cases(StyletronMonolithicHooks),
  "Styled Components": cases(StyledComponents),
};
