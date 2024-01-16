"use client";
import React, { useState } from "react";

interface ContactButtonProps {
  text: string;
}

const ContactButton = ({ text }: ContactButtonProps) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <div>
      <p>
        {showFullText ? text : `${text.slice(0, 20)}...`}
        <button onClick={toggleText}>
          {showFullText ? "Show less" : "Show more"}
        </button>
      </p>
    </div>
  );
};

export default ContactButton;
