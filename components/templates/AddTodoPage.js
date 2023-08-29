import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import RadioButton from "@/modules/RadioButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { SiTodoist } from "react-icons/si";
import { CiSettings } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const AddTodoPage = ({ data }) => {
  const [todo, setTodo] = useState(
    data
      ? data
      : {
          title: "",
          status: "todo",
          descriptions: "",
        }
  );
  const [error, setError] = useState("");

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  const changeHandler = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "failed") setError(data.message);
    if (data.status === "success") {
      setTodo({
        title: "",
        status: "todo",
        descriptions: "",
      });
      toast.success("Todo added!");
    }
  };

  const editHandler = () => {
    fetch("/api/edit-todo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        router.replace("/");
      });
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[80%] rounded-2xl py-5 px-2 border border-gray-200 flex flex-col items-center gap-5">
        <h1 className="text-2xl text-blue-600 font-bold text-center">
          {data ? "Edit Todo" : "Add New Todo"}
        </h1>

        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="title" className="text-gray-400">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={changeHandler}
            className="input"
            maxLength="50"
          />
        </div>
        <div className="w-full flex flex-col items-start">
          <RadioButton
            label="Todo"
            value="todo"
            icon={<SiTodoist />}
            onChange={changeHandler}
            checked={todo.status === "todo"}
          />
          <RadioButton
            label="In Progress"
            value="inProgress"
            icon={<CiSettings />}
            onChange={changeHandler}
            checked={todo.status === "inProgress"}
          />
          <RadioButton
            label="Review"
            value="review"
            icon={<MdPreview />}
            onChange={changeHandler}
            checked={todo.status === "review"}
          />
          <RadioButton
            label="Done"
            value="done"
            icon={<TiTick />}
            onChange={changeHandler}
            checked={todo.status === "done"}
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="descriptions" className="text-gray-400">
            Descriptions
          </label>
          <textarea
            name="descriptions"
            id="descriptions"
            rows="7"
            value={todo.descriptions}
            onChange={changeHandler}
            className="input"
          ></textarea>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          onClick={data ? editHandler : addHandler}
          className="py-1 px-10 rounded-md text-white bg-green-600"
        >
          {data ? "Edit" : "Add"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodoPage;
