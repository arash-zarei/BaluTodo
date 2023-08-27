import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { signIn } from "next-auth/react"

import Form from './Form';

const SignInPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
      const [error, setError] = useState("");
    
      const { email, password } = user;
    
      const router = useRouter()
    
      const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
      const signInHandler = async () => {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (!res.ok) setError(res.error);
        if (res.ok) {
          setError("")
          router.replace("/")
        }
      };
    
      return (
        <Form
          user={user}
          changeHandler={changeHandler}
          functionHandler={signInHandler}
          title="Sign In"
          path="/signup"
          textLink="Not registered?"
          error={error}
        />
      );
};

export default SignInPage;