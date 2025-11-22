import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  size: number;
  color: string;
  filled?: boolean;
};

export const NotificationIcon = ({ size, color, filled = false }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {filled ? (
      <Path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.13 5.36 5.5 7.92 5.5 11v5l-1.5 1.5v.5h16v-.5L18 16z"
        fill={color}
      />
    ) : (
      <Path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.13 5.36 5.5 7.92 5.5 11v5l-1.5 1.5v.5h16v-.5L18 16z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    )}
  </Svg>
);

export default NotificationIcon;
