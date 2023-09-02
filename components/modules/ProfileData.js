import React from "react";

const ProfileData = ({ data }) => {
  const { name, lastName, email } = data;
  return (
    <div className="mt-8">
      <div className="flex items-center overflow-x-auto gap-2 mt-3 bg-blue-300 rounded-md p-2">
        <span className="text-gray-500">Name:</span>
        <p>{name}</p>
      </div>
      <div className="flex items-center overflow-x-auto gap-2 mt-3 bg-blue-300 rounded-md p-2">
        <span className="text-gray-500">Last Name:</span>
        <p>{lastName}</p>
      </div>
      <div className="flex items-center overflow-x-auto gap-2 mt-3 bg-blue-300 rounded-md p-2">
        <span className="text-gray-500">Email:</span>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default ProfileData;
