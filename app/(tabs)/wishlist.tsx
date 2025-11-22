import Svg, { Path } from "react-native-svg";
import React from "react";

type IconProps = {
  size: number;
  color: string;
  filled?: boolean;
};

export const HeartIcon = ({ size, color, filled = false }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {filled ? (
      <Path
        d="M12.001 21.3c-.3-.2-.6-.4-.9-.7-4.9-4.3-8.1-7.3-8.1-11.1C3.001 6 5.5 3.5 8.7 3.5c1.8 0 3.4.8 4.3 2.1 1-1.3 2.6-2.1 4.3-2.1 3.2 0 5.7 2.5 5.7 6 0 3.8-3.2 6.8-8.1 11.1-.3.3-.6.5-.9.7-.2.2-.5.2-.7 0z"
        fill={color}
      />
    ) : (
      <Path
        d="M8.7 3.5c1.8 0 3.4.8 4.3 2.1 1-1.3 2.6-2.1 4.3-2.1 3.2 0 5.7 2.5 5.7 6 0 3.8-3.2 6.8-8.1 11.1-.3.3-.6.5-.9.7-.2.2-.5.2-.7 0-.3-.2-.6-.4-.9-.7-4.9-4.3-8.1-7.3-8.1-11.1 0-3.5 2.5-6 5.7-6z"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </Svg>
);

export default HeartIcon;
