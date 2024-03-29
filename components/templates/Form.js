import React from "react";
import Link from "next/link";

const Form = ({
  changeHandler,
  user,
  path,
  textLink,
  functionHandler,
  title,
  error,
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[80%] sm:w-[60%] rounded-2xl py-7 px-2 border border-gray-200 flex flex-col items-center gap-5">
        <h1 className="text-2xl text-blue-700 font-extrabold">{title}</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={changeHandler}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={changeHandler}
          className="input"
        />

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          onClick={functionHandler}
          className="py-1 px-5 bg-yellow-400 rounded-md"
        >
          {title}
        </button>
        <Link href={path} className="text-blue-600 underline text-sm">
          {textLink}
        </Link>
      </div>
    </div>
  );
};

export default Form;
