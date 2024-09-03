import React from "react";

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col w-full md:w-auto items-center justify-center">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-medium break-all">{value}</p>
    </div>
  );
};

export default DetailRow;
