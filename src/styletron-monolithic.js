import * as React from "react";

import { Client } from "styletron-engine-atomic";
import {
  Provider as StyletronProvider,
  styled,
  withStyleDeep,
} from "styletron-react";

export const View = styled("div", {
  alignItems: "stretch",
  borderWidth: "0px",
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  flexBasis: "auto",
  flexDirection: "column",
  flexShrink: "0",
  margin: "0px",
  padding: "0px",
  position: "relative",
  minHeight: "0px",
  minWidth: "0px",
});

const client = new Client();
export function Provider({ children }) {
  return (
    <StyletronProvider value={client}>
      <View>{children}</View>
    </StyletronProvider>
  );
}

function getColor(color) {
  switch (color) {
    case 0:
      return "#14171A";
    case 1:
      return "#AAB8C2";
    case 2:
      return "#E6ECF0";
    case 3:
      return "#FFAD1F";
    case 4:
      return "#F45D22";
    case 5:
      return "#E0245E";
    default:
      return "transparent";
  }
}

export const Box = withStyleDeep(View, ({ color, fixed, layout, outer }) => {
  return {
    alignSelf: "flex-start",
    backgroundColor: getColor(color),
    flexDirection: layout === "column" ? "column" : "row",
    padding: outer ? "4px" : null,
    height: fixed ? "6px" : null,
    width: fixed ? "6px" : null,
  };
});

export const Dot = styled("div", ({ size, x, y, color }) => ({
  position: "absolute",
  cursor: "pointer",
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderTopWidth: 0,
  transform: "translate(50%, 50%)",
  borderTopColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor: color,
  borderLeftColor: "transparent",
  borderRightWidth: `${size / 2}px`,
  borderBottomWidth: `${size / 2}px`,
  borderLeftWidth: `${size / 2}px`,
  marginLeft: `${x}px`,
  marginTop: `${y}px`,
}));
