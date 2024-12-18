/*
    Box component
*/
"use client";

import React from "react";
import "./Box.scss";

interface BoxProps {
  children?: React.ReactNode;
  align?: string;
  margin?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
}

const Box: React.FC<BoxProps> = ({ children, align, margin }) => {
  return (
    <div
      className={"box " + (align ? "align-" + align : "")}
      style={{
        marginLeft: margin?.left,
        marginRight: margin?.right,
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
