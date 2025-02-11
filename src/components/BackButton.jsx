import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`mb-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded shadow hover:bg-gray-600 ${className}`}
    >
      ← Back
    </button>
  );
};

export default BackButton;
