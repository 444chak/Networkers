"use client";

import React from "react";
import "./Text.scss";

interface TextProps {
  children: React.ReactNode;
  color?: string;
  size?: string;
  weight?: string;
  margin?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  align?: "left" | "center" | "right" | "justify";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end"; // Add the iconPosition prop here
}

const Text: React.FC<TextProps> = ({
  children,
  color,
  size,
  weight,
  margin,
  align,
  className,
  icon,
  iconPosition = "start", // Destructure the iconPosition prop here with a default value
}) => {
  return (
    <span
      className={`text ${className}`}
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        marginLeft: margin?.left,
        marginRight: margin?.right,
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
        textAlign: align,
      }}
    >
      {iconPosition === "start" && icon && <span className="icon">{icon}</span>}
      {children}
      {iconPosition === "end" && icon && <span className="icon">{icon}</span>}
    </span>
  );
};

export default Text;
