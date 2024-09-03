import React, { Dispatch, SetStateAction, useState } from "react";
import { CreateSecret, Secret } from "../../interface/Secret";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { addSecret } from "../../api/Secret";

const SecretInputField: React.FC<{
  setAddSecret: Dispatch<SetStateAction<boolean>>;
  setSecrets: Dispatch<SetStateAction<Secret[]>>;
  secrets: Secret[];
}> = ({ setAddSecret, setSecrets, secrets }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState("");
  const [secret, setSecret] = useState<CreateSecret>({
    value: "",
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;
    setSecret((prevSecret) => ({
      ...prevSecret,
      [name]: value,
    }));
  };

  const handleAddSecret = async () => {
    const response = await addSecret(secret);
    if (response.status === 200) {
      setSecrets([...secrets, response.data.data]);
      setAddSecret(false);
    } else {
      setError(response.data.error);
    }
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div
        className={`${
          error !== "" ? "opacity-100" : "opacity-0"
        } px-4 duration-300 ease-in-out`}
      >
        <p className="text-red-500 font-bold">{error}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center w-full relative">
          <input
            type={showSecret ? "text" : "password"}
            placeholder="Secret"
            name="value"
            value={secret.value}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowSecret(!showSecret)}
            className=" text-gray-400 hover:text-white absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {showSecret ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={secret.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={secret.description}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddSecret}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SecretInputField;
