import React, { useEffect, useState } from "react";
import ProfileData from "@/modules/ProfileData";
import ProfileForm from "@/modules/ProfileForm";

// Icons
import { CgProfile } from "react-icons/cg";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  const [dataUser, setDataUser] = useState(null);

  const [error, setError] = useState("");

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

  const postHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.status === "failed") setError(data.message);
    console.log(data);
  };
  return (
    <div className="w-full mt-4 p-4 flex justify-center items-center">
      <div className="w-[80%] p-5 border border-gray-400 rounded-lg">
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
    </div>
  );
};

export default ProfilePage;
