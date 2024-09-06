"use client";
import React, { useState } from "react";
import {
  Secret,
  SecretCardProps,
  UpdateSecretProps,
} from "@/app/interface/Secret";
import { AccessPassword } from "./AccessPasswordField";
import { SecretValueField } from "./SecretValueField";
import { FaPen, FaTrashCan } from "react-icons/fa6";
import { deleteSecret, updateSecret } from "@/app/api/Secret";
import { BsSave } from "react-icons/bs";

const SecretCard: React.FC<SecretCardProps> = ({
  secret,
  onDelete,
  setError,
}) => {
  const [extended, setExtended] = useState(false);
  const [secretData, setSecretData] = useState<Secret>(secret);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UpdateSecretProps>(secret);

  const handleSecretsDelete = async () => {
    try {
      const response = await deleteSecret(secret.id.toString());
      if (response.status === 200) {
        onDelete(response.data.data.id);
      } else {
        setErrorTiming(response.data.error);
      }
    } catch (error) {
      setErrorTiming("Failed to delete the secret. Please try again.");
    }
  };

  const setErrorTiming = (message: string) => {
    setTimeout(() => {
      setError("");
    }, 3000);
    setError(message);
  };

  const handleSecretUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateSecret(editData);
      if (response.status === 200) {
        setSecretData((prevData) => ({
          ...prevData,
          name: response.data.data.name,
          value: response.data.data.value,
          description: response.data.data.description,
        }));
        setIsEditing(false);
      } else {
        setErrorTiming(response.data.error);
      }
    } catch (error) {
      setErrorTiming("Failed to update the secret. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg w-full px-4 py-2">
      <form
        onSubmit={handleSecretUpdate}
        className="grid grid-cols-6 items-center text-center py-2 gap-4"
      >
        {isEditing ? (
          <input
            className="w-full bg-gray-700 text-white p-1 rounded text-center"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            required
          />
        ) : (
          <p className="w-full">{secretData.name}</p>
        )}

        <p className="w-full">{secretData.id}</p>

        {isEditing ? (
          <input
            className="w-full bg-gray-700 text-white p-1 rounded text-center"
            value={editData.value}
            onChange={(e) =>
              setEditData({ ...editData, value: e.target.value })
            }
            required
          />
        ) : (
          <SecretValueField
            secretValue={secretData.value}
            style={"w-full flex justify-center gap-2"}
          />
        )}

        <AccessPassword
          secretData={secretData}
          setSecretData={setSecretData}
          style={"w-full flex justify-center gap-2"}
        />

        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={!isEditing ? () => setIsEditing(true) : handleSecretUpdate}
            aria-label={isEditing ? "Cancel Edit" : "Edit Secret"}
          >
            {isEditing ? <BsSave /> : <FaPen />}
          </button>
          {isEditing ? (
            <button type="button" onClick={() => setIsEditing(false)}>
              X
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSecretsDelete()}
              aria-label="Delete Secret"
            >
              <FaTrashCan />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setExtended(!extended)}
          className="self-start text-blue-500 hover:text-blue-300 transition-colors duration-300"
        >
          {extended ? "A" : "V"}
        </button>
      </form>

      {(extended || isEditing) && (
        <div className="space-y-2 p-2">
          <p>Description</p>
          {isEditing ? (
            <textarea
              className="w-full bg-gray-700 text-white p-1 rounded"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
          ) : (
            <p>{secretData.description}</p>
          )}
          <p>API Requests</p>
          <p>{secretData.api_requests}</p>
        </div>
      )}
    </div>
  );
};

export default SecretCard;
