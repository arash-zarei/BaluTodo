import React, { useState } from "react";

import Form from "@/templates/Form";
import { useRouter } from "next/router";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("")

  const router = useRouter()

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signUpHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "failed") setError(data.message) 
    if (data.status === "success") router.replace("/signin")
  };

  return (
    <Form
      changeHandler={changeHandler}
      user={user}
      functionHandler={signUpHandler}
      path="/signin"
      textLink="Already registered?"
      title="Sign Up"
      error={error}
    />
  );
};

export default SignUp;
