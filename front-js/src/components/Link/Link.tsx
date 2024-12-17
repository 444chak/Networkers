"use client";

import NextLink from "next/link";
import React from "react";
import "./Link.scss";

interface LinkProps {
  href: string;
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
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  color,
  size,
  weight,
  margin,
}) => {
  return (
    <NextLink
      href={href}
      className="link"
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        marginLeft: margin?.left,
        marginRight: margin?.right,
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
      }}
    >
      {children}
    </NextLink>
  );
};

export default Link;
