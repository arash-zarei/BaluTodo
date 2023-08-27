import React, { useState } from "react";

import Form from "@/templates/Form";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signInHandler = () => {};

  return (
    <Form
      user={user}
      changeHandler={changeHandler}
      functionHandler={signInHandler}
      title="Sign In"
      path="/signup"
      textLink="You are not account?"
    />
  );
};

export default SignIn;
