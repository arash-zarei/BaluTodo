import React from "react";

// Icons
import { AiFillCloseCircle } from "react-icons/ai";

const EditProfile = ({
  setIsOpen,
  editHandler,
  name,
  lastName,
  password,
  changeHandlerEditUser,
}) => {
  return (
    <div className="w-full h-screen absolute bg-gray-800/80 flex justify-center items-center">
      <div className="w-[80%] p-5 border border-gray-400 rounded-lg bg-white">
        <AiFillCloseCircle
          size={21}
          color="red"
          className="cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="name">Name:</label>
            <input
              className="input"
              type="text"
              name="name"
              value={name}
              onChange={changeHandlerEditUser}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="last-name">Last Name:</label>
            <input
              className="input"
              type="text"
              name="lastName"
              value={lastName}
              onChange={changeHandlerEditUser}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="password">Password:</label>
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={changeHandlerEditUser}
            />
          </div>
        </div>
        <button
          className="py-1 px-5 rounded-md bg-green-400 mt-4"
          onClick={editHandler}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
