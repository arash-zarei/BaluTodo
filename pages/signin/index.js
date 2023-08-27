import { getSession } from "next-auth/react";

import SignInPage from "@/templates/SignInPage";

const SignIn = () => {
  return <SignInPage />;
};

export default SignIn;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/", permanet: false },
    };
  }

  return {
    props: { session },
  };
}
