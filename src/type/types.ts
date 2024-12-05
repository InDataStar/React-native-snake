export interface GestureEventType {
  nativeEvent: { translationX: number; translationY: number };
}

export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  RIGHT,
  UP,
  LEFT,
  DOWN,
}

export const Colors = {
  primary: "black",
  secondary: "#84cc16",
  tertiary: "#eab308",
  background: "white",
};
