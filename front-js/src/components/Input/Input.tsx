"use client";

import React from "react";
import "./Input.scss";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  margin?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  margin,
  disabled,
  required,
  label,
}) => {
  return (
    <div
      className="input"
      style={{
        marginLeft: margin?.left,
        marginRight: margin?.right,
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
      }}
    >
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default Input;
