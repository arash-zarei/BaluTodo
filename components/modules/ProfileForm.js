import React from "react";

const ProfileForm = ({
    name,
    lastName,
    password,
    error,
    changHandler,
    postHandler,
}) => {
  return (
    <>
      <div>
        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="name">Name:</label>
          <input
          className="input"
            id="name"
            type="text"
            value={name}
            name="name"
            onChange={changHandler}
          />
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="last-name">Last Name:</label>
          <input
          className="input"
            id="last-name"
            type="text"
            value={lastName}
            name="lastName"
            onChange={changHandler}
          />
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="password">Password:</label>
          <input
          className="input"
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={changHandler}
          />
        </div>
      </div>
      {error && <p className="text-red-600 my-2 text-center py-3">{error}</p>}
      <div className="w-full flex justify-center items-center"><button onClick={postHandler} className="py-1 px-5 rounded-md bg-green-400 mt-4">Submit</button></div>
    </>
  );
};

export default ProfileForm;
