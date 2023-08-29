import Link from "next/link";
import React from "react";

// Icons
import { PiSubtitles } from "react-icons/pi";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

const Tasks = ({ data, color, next, back, fetchTodos }) => {
  const statusHandler = (id, status) => {
    fetch("api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchTodos();
      });
  };

  return (
    <div className="w-full">
      {data ? (
        data.map((todo) => (
          <div key={todo._id} className="w-full shadow-md p-2 mt-1">
            <span
              className={`w-[80%] h-[2px] rounded-md block ${color}`}
            ></span>
            <div className="mt-3 flex flex-col gap-2">
              <PiSubtitles />
              <p>{todo.title}</p>
              <Link
                href={`todo/${todo._id}`}
                className="text-center text-sm text-red-600 underline"
              >
                Details
              </Link>
            </div>
            <div className="flex justify-between items-center mt-6 mb-2">
              {back && (
                <button
                  onClick={() => statusHandler(todo._id, back)}
                  className="px-2 rounded-md bg-orange-300 text-orange-700 flex gap-1 items-center"
                >
                  <AiFillCaretLeft /> Back
                </button>
              )}
              {next && (
                <button
                  onClick={() => statusHandler(todo._id, next)}
                  className="px-2 rounded-md bg-green-300 text-green-700 flex gap-1 items-center"
                >
                  Next <AiFillCaretRight />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-3">
          <ClipLoader color="#7736d6" />
        </div>
      )}
    </div>
  );
};

export default Tasks;
