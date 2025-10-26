import Head from "next/head";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import { redirect } from "next/dist/server/api-utils";
import useCurrentUser from "@/hook/useCurrentUser";

const index = () => {
  const { data: user } = useCurrentUser();

  return (
    <>
      <div>
        <h1 style={{ color: "#fff" }}>Profile {user?.email}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    console.log("not allowed");
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default index;
