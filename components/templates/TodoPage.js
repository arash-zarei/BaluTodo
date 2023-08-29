import Link from "next/link";
import React from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

const TodoPage = ({ todo }) => {
  const { title, status, descriptions } = todo;
  return (
    <div className="w-full p-2 mt-4 flex justify-center items-center">
      <div className="w-[80%] border border-gray-400 rounded-lg p-5">
      <Link href={`/edit/${todo._id}`}><MdOutlineModeEditOutline /></Link>
        <h1 className="text-2xl text-center text-blue-700">{title}</h1>
        <p
          className={`py-1 px-3 ${status === "todo" && "bg-orange-500"} ${
            status === "inProgress" && "bg-blue-500"
          } ${status === "review" && "bg-yellow-400"} ${
            status === "done" && "bg-green-500"
          } rounded-md text-center mt-5`}
        >
          {status}
        </p>
        <textarea value={descriptions} disabled className="w-full border border-gray-400 mt-5 px-2 py-4 rounded-xl leading-7 resize-none" rows="10"></textarea>
      </div>
    </div>
  );
};

export default TodoPage;
