import HomePage from "@/templates/HomePage";
import { getSession } from "next-auth/react";

const Home = () => {
  return <HomePage />;
};

export default Home;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/signin", permanet: false },
    };
  }

  return {
    props: { session },
  };
}
