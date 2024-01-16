import React from "react";
import { FaCheck } from "react-icons/fa";
import { BiErrorAlt } from "react-icons/bi";

interface MessageProps {
  message: string;
  type: "success" | "error";
  isSuccess: boolean;
}

const Message = ({ message, type, isSuccess }: MessageProps) => {
  return (
    <div className={`message ${type}`}>
      <h3>
        {message} {isSuccess ? <FaCheck /> : <BiErrorAlt />}
      </h3>
    </div>
  );
};

export default Message;
