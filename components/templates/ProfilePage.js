import React, { useEffect, useState } from "react";
import ProfileData from "@/modules/ProfileData";
import ProfileForm from "@/modules/ProfileForm";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { CgProfile } from "react-icons/cg";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EditProfile from "@/modules/EditProfile";

const ProfilePage = ({ userData }) => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  const [dataUser, setDataUser] = useState(null);

  const [editUser, setEditUser] = useState({ ...userData, password: "" });

  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.status === "success" && data.data.name && data.data.lastName) {
      setDataUser(data.data);
    }
  };

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const changeHandlerEditUser = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const postHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.status === "failed") setError(data.message);
    if (data.status === "success") {
      fetchProfile();
      toast.success("Added Data");
    }
  };

  const editHandler = async () => {
    const res = await fetch(`/api/profile/${editUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser),
    });
    const data = await res.json();
    if (data.status === "failed") setError(data.message);
    if (data.status === "success") {
      fetchProfile();
      toast.success("Edited User");
      setIsOpen(false);
      setEditUser({ ...userData, password: "" });
    }
  };

  return (
    <div className="w-full min-h-screen relative p-8 flex justify-center items-center">
      <div className="w-[80%] p-5 border border-gray-400 rounded-lg">
        {dataUser && (
          <button
            className="outline-none border-none"
            onClick={() => setIsOpen(true)}
          >
            <MdOutlineModeEditOutline size={21} />
          </button>
        )}
        <h1 className="text-center text-blue-700 font-semibold text-2xl">
          <CgProfile className="inline" /> Profile
        </h1>

        {dataUser ? (
          <ProfileData data={dataUser} />
        ) : (
          <ProfileForm
            name={user.name}
            lastName={user.lastName}
            password={user.password}
            error={error}
            changHandler={changeHandler}
            postHandler={postHandler}
          />
        )}
      </div>
      {isOpen && (
        <EditProfile
          setIsOpen={setIsOpen}
          name={editUser.name}
          lastName={editUser.lastName}
          password={editUser.password}
          changeHandlerEditUser={changeHandlerEditUser}
          editHandler={editHandler}
          error={error}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
