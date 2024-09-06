import { useState } from "react";
import axios from "axios";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
export const SecretValueField: React.FC<{
  secretValue: string;
  style: string;
}> = ({ secretValue, style }) => {
  const [showSecretValue, setShowSecretValue] = useState(false);

  return (
    <p className={style}>
      {showSecretValue ? secretValue : "********"}{" "}
      <span
        className="text-blue-500 cursor-pointer"
        onClick={() => setShowSecretValue(!showSecretValue)}
      >
        {showSecretValue ? <FaEye /> : <FaEyeSlash />}
      </span>
    </p>
  );
};
