import { getSession } from "next-auth/react";
import SignUpPage from "@/templates/SignUpPage";

const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;

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
