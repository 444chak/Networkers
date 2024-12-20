/*
    Backlink component
*/
"use client";

import React from "react";
import "./Backlink.scss";
import Box from "../Box";

interface BacklinkProps {
  onClick: () => void;
}

const Backlink: React.FC<BacklinkProps> = ({ onClick }) => {
  return (
    <Box margin={{ top: "20px", left: "20px", right: "20px" }}>
      <div className="backlink" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Retour à la page précédente"
        >
          <path
            d="M12.727 3.687C12.8172 3.59153 12.8877 3.47923 12.9345 3.3565C12.9814 3.23377 13.0035 3.10302 12.9998 2.97172C12.9961 2.84042 12.9666 2.71113 12.9129 2.59125C12.8592 2.47136 12.7824 2.36322 12.687 2.273C12.5915 2.18279 12.4792 2.11226 12.3565 2.06544C12.2337 2.01863 12.103 1.99644 11.9717 2.00016C11.8404 2.00387 11.7111 2.03341 11.5912 2.08709C11.4713 2.14077 11.3632 2.21753 11.273 2.313L2.77298 11.313C2.59744 11.4987 2.49963 11.7445 2.49963 12C2.49963 12.2555 2.59744 12.5013 2.77298 12.687L11.273 21.688C11.3626 21.7856 11.4707 21.8643 11.591 21.9198C11.7114 21.9752 11.8415 22.0062 11.9739 22.0109C12.1063 22.0156 12.2383 21.9939 12.3623 21.9472C12.4862 21.9004 12.5997 21.8295 12.696 21.7386C12.7923 21.6476 12.8696 21.5384 12.9233 21.4173C12.9771 21.2963 13.0063 21.1657 13.0092 21.0333C13.0121 20.9008 12.9886 20.7691 12.9402 20.6458C12.8917 20.5225 12.8192 20.4101 12.727 20.315L4.87498 12L12.727 3.687Z"
            fill="#181B1F"
          />
        </svg>
      </div>
    </Box>
  );
};

export default Backlink;
