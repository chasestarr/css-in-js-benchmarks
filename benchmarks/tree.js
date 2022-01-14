// references https://github.com/necolas/react-native-web/tree/48da9814e7fe7ccc625d713c73bb6c1c4ce861b7/packages/benchmarks

import * as React from "react";

export function Tree({ breadth, components, depth, id, wrap }) {
  const { Box } = components;
  let result = (
    <Box color={id % 3} layout={depth % 2 === 0 ? "column" : "row"} outer>
      {depth === 0 && <Box color={(id % 3) + 3} fixed />}
      {depth !== 0 &&
        Array.from({ length: breadth }).map((el, i) => (
          <Tree
            breadth={breadth}
            components={components}
            depth={depth - 1}
            id={i}
            key={i}
            wrap={wrap}
          />
        ))}
    </Box>
  );
  for (let i = 0; i < wrap; i++) {
    result = <Box>{result}</Box>;
  }
  return result;
}
