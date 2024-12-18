/*
    Button component
*/
"use client";

import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  primary?: boolean;
  secondary?: boolean;
  textsize?: string;
  margin?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  disabled?: boolean;
  type?: "input"; // Modified this line to include "submit"
  form?: "submit"; // Added this line
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  primary,
  secondary,
  textsize,
  margin,
  disabled,
  type,
  form,
}) => {
  return (
    <button
      onClick={onClick}
      type={form === "submit" ? "submit" : "button"} // Added HTML button type
      className={
        "button " +
        (primary ? "primary" : secondary ? "secondary" : "") +
        (type === "input" ? " input" : "")
      }
      style={{
        fontSize: textsize,
        marginLeft: margin?.left,
        marginRight: margin?.right,
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
      }}
      disabled={disabled}
    >
      <span className="text">{text}</span>
    </button>
  );
};

export default Button;
