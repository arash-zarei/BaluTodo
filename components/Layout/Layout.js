import Link from "next/link";
import React from "react";

//  Icons
import { CgMenuMotion, CgProfile } from "react-icons/cg";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineAddCircle } from "react-icons/md";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";

const Layout = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto flex justify-between">
      {/* start aside */}
      <aside className="w-[20%] bg-slate-100 rounded-lg px-4 py-2 min-h-screen">
        <div className="flex items-center justify-between">
          <h4 className="text-xl">Menu</h4>
          <CgMenuMotion className="cursor-pointer" />
        </div>

        <div>
          <ul className="border-b border-gray-300 pb-7">
            <li className="mt-6 flex items-center gap-2">
              <FcTodoList />
              <Link href="/">Todos</Link>
            </li>
            <li className="mt-6 flex items-center gap-2">
              <MdOutlineAddCircle />
              <Link href="/add-todo">Add ToDo</Link>
            </li>
            <li className="mt-6 flex items-center gap-2">
              <CgProfile />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="mt-6 flex items-center gap-2 cursor-pointer hover:text-red-600">
              <AiOutlineLogout /> Sign Out
            </li>
            <li className="mt-6 flex items-center gap-2 cursor-pointer hover:text-green-600">
              <AiOutlineLogin /> Sign In
            </li>
            <li className="mt-6 flex items-center gap-2 cursor-pointer hover:text-green-600">
              <FiLogIn /> Sign Up
            </li>
          </ul>
        </div>
      </aside>
      {/* end aside */}

      {/* start content */}
      <div className="w-[80%]">{children}</div>
      {/* end content */}
    </div>
  );
};

export default Layout;
