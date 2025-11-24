import React from "react";
import { Text, TextInput } from "react-native";

export const applyGlobalFont = () => {
  // Override Text default font
  const oldTextRender = Text.render;
  Text.render = function (...args) {
    const origin = oldTextRender.apply(this, args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Inter_400Regular" }, origin.props.style],
    });
  };

  // Override TextInput default font
  const oldInputRender = TextInput.render;
  TextInput.render = function (...args) {
    const origin = oldInputRender.apply(this, args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Inter_400Regular" }, origin.props.style],
    });
  };
};
export default applyGlobalFont;
