import React from "react";

const RadioButton = ({ label, value, icon, onChange, checked }) => {
  return (
    <div className={`min-w-[160px] flex items-center gap-2 ${value === 'todo' && "bg-orange-500"} ${value === 'inProgress' && "bg-blue-500"} ${value === 'review' && "bg-yellow-400"} ${value === 'done' && "bg-green-500"} py-1 px-3 rounded mt-2`}>
      <label htmlFor={value} className="flex items-center gap-1 cursor-pointer">
        {icon}
        {label}
      </label>
      <input type="radio" checked={checked} value={value} id={value} name="status" onChange={onChange} />
    </div>
  );
};

export default RadioButton;
