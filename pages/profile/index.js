import User from "@/models/User";
import ProfilePage from "@/templates/ProfilePage";
import { getSession } from "next-auth/react";

const Profile = ({ user }) => {
  return <ProfilePage userData={user} />;
};

export default Profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/signin", permanet: false },
    };
  }

  const user = await User.findOne({email: session.user.email})
  const limitData = {
    name: user.name,
    lastName: user.lastName,
    id: user._id
  }

  return {
    props: { user: JSON.parse(JSON.stringify(limitData)) },
  };
}
