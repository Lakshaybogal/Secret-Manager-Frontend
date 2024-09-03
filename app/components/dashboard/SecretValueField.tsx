import { useState } from "react";
import axios from "axios";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
export const SecretValueField: React.FC<{
  secretValue: string;
}> = ({ secretValue }) => {
  const [showSecretValue, setShowSecretValue] = useState(false);

  return (
    <p className="text-sm mb-2 flex items-center justify-center">
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
