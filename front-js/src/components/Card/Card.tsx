"use client";

import React from "react";
import "./Card.scss";
import Image from "next/image";

interface CardProps {
  children?: React.ReactNode;
  title: string;
  onClick?: () => void;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  onClick,
  description,
  image,
}) => {
  return (
    <div className="card" onClick={onClick}>
      <Image
        src={image}
        alt="card-bg"
        width={100}
        height={200}
        className="background-image"
        sizes="100vw"
      />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
