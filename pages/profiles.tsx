import Head from "next/head";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hook/useCurrentUser";
import styles from "@/styles/Profiles.module.css";
import { useRouter } from "next/router";

const index = () => {
  const { data: user } = useCurrentUser();
  const router = useRouter();

  return (
    <>
      <div>
        <div className={styles.ProfileContainer}>
          <h1>Who is watching?</h1>
          <div onClick={() => router.push("/")}>
            <div className={styles.Profiles}>
              <div className={styles.Profile}>
                <img src="/avatar.png" alt="avatar" />
                <p>{user?.name}</p>
              </div>
            </div>
          </div>
        </div>
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
