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
}

const Text: React.FC<TextProps> = ({
  children,
  color,
  size,
  weight,
  margin,
  align,
}) => {
  return (
    <span
      className="text"
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
      {children}
    </span>
  );
};

export default Text;
