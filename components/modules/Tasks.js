import Link from "next/link";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { PiSubtitles } from "react-icons/pi";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";

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

  const deleteHandler = async (id) => {
    const res = await fetch(`/api/delete-todo/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.error("Deleted Todo");
      fetchTodos();
    }
  };

  return (
    <div className="w-full">
      {data ? (
        data.map((todo) => (
          <div key={todo._id} className="w-full shadow-lg rounded-md p-2 mt-1">
            <div className="w-full flex justify-between items-center mt-2">
              <button onClick={() => deleteHandler(todo._id)}>
                <MdDeleteOutline size={21} color="red" />
              </button>
              <span
                className={`w-[75%] h-[2px] rounded-md block ${color}`}
              ></span>
              <Link href={`edit/${todo._id}`}>
                <MdOutlineModeEditOutline size={21} />
              </Link>
            </div>
            <div className="mt-5 flex flex-col gap-2">
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
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Tasks;
