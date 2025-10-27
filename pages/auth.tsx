import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name: name,
        password: password,
        email: email,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });

      router.push("/profiles");
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  return (
    <>
      <div className={styles.overlayContainer}>
        <div className={styles.contentHolder}>
          <nav>
            <img src={"/images/logo.png"} alt="logo" />
          </nav>
          <div className={styles.InputContainer}>
            <div className={styles.InputHeader}>
              <h2>{variant == "login" ? "Sign in" : "Register"}</h2>
              {variant == "register" && (
                <Input label="Username" setValue={setUsername} />
              )}
              <Input label="Email" setValue={setEmail} />
              <Input label="Password" setValue={setPassword} />
              <button
                className={styles.actionBtn}
                onClick={variant == "login" ? login : register}
              >
                {variant == "login" ? "Login" : "Register"}
              </button>
              <div className={styles.oAuthContainer}>
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                >
                  <FcGoogle />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                >
                  <FaGithub />
                </div>
              </div>
              <p className={styles.noti}>
                {variant == "login"
                  ? "First time using CodyFlix?"
                  : "Already have an account"}
                <span onClick={toggleVariant}>
                  {" "}
                  {variant == "login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
