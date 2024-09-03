import { Dispatch, SetStateAction } from "react";

export interface Secret {
  id: number;
  name: string;
  value: string;
  description: string;
  access_password: string;
  api_requests: number;
}

export interface CreateSecret {
  name: string;
  value: string;
  description: string;
}

export interface AccessPasswordProps {
  secretData: Secret;
  setSecretData: Dispatch<SetStateAction<Secret>>;
}
