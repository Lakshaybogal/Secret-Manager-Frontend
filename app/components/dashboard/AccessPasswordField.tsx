import { useState } from "react";
import axios from "axios";
import { AccessPasswordProps } from "@/app/interface/Secret";
import { FaEye, FaEyeSlash, FaRotate } from "react-icons/fa6";

export const AccessPassword: React.FC<AccessPasswordProps> = ({
  secretData,
  setSecretData,
}) => {
  const [showAccessPassword, setShowAccessPassword] = useState(false);

  const updateAccessPassword = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/env/accesspassword/`,
        { name: secretData.name },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSecretData((prevData) => ({
          ...prevData,
          access_password: response.data.data.access_password,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <p className="text-sm mb-2 flex justify-center items-center">
      {showAccessPassword ? secretData.access_password : "********"}
      <span
        className="text-blue-500 cursor-pointer"
        onClick={() => setShowAccessPassword(!showAccessPassword)}
      >
        {showAccessPassword ? <FaEye /> : <FaEyeSlash />}
      </span>
      <span
        className="text-red-500 cursor-pointer ml-2"
        onClick={updateAccessPassword}
      >
        <FaRotate />
      </span>
    </p>
  );
};
