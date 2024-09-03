import { Secret } from "@/app/interface/Secret";
import React, { useState } from "react";
import { AccessPassword } from "./AccessPasswordField";
import { SecretValueField } from "./SecretValueField";
import { FaPen, FaTrashCan } from "react-icons/fa6";
import DetailRow from "./DetailRow";

const SecretCard: React.FC<{ secret: Secret }> = ({ secret }) => {
  const [extended, setExtended] = useState(false);
  const [secretData, setSecretData] = useState(secret);
  return (
    <div className="flex flex-col p-4 bg-gray-800 rounded-lg shadow-lg space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <DetailRow label="Name" value={secret.name} />
        <DetailRow label="Key" value={secret.id} />
        <DetailRow
          label="Access Password"
          value={
            <AccessPassword
              secretData={secretData}
              setSecretData={setSecretData}
            />
          }
        />
        <DetailRow
          label="Secret"
          value={<SecretValueField secretValue={secret.value} />}
        />
        <div className="flex gap-2">
          <span>
            <FaTrashCan />
          </span>
          <span>
            <FaPen />
          </span>
        </div>
      </div>

      {extended && (
        <div className="space-y-2">
          <DetailRow label="Description" value={secret.description} />
          <DetailRow label="API Requests" value={secret.api_requests} />
        </div>
      )}

      <button
        onClick={() => setExtended(!extended)}
        className="self-start text-blue-500 hover:text-blue-300 transition-colors duration-300"
      >
        {extended ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default SecretCard;
