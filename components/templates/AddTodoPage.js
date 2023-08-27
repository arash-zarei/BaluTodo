import RadioButton from "@/modules/RadioButton";
import React, { useState } from "react";

// Icons
import { SiTodoist } from "react-icons/si";
import { CiSettings } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const AddTodoPage = () => {
  const [todo, setTodo] = useState({
    title: "",
    status: "todo",
    descriptions: "",
  });

  const changeHandler = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo);
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[80%] rounded-2xl py-5 px-2 border border-gray-200 flex flex-col items-center gap-5">
        <h1 className="text-2xl text-blue-600 font-bold text-center">
          Add New Todo
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
            value={todo.descriptions}
            onChange={changeHandler}
            className="input"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddTodoPage;
