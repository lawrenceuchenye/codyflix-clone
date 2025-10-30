import styles from "./index.module.css";
import { BsChevronCompactDown } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hook/useCurrentUser";

const TOP_OFFSET = 66;

interface NavbarItemProp {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProp> = ({ label }) => {
  return (
    <div className={styles.NavbarItem}>
      <p>{label}</p>
    </div>
  );
};

const MobileMenu = () => {
  return (
    <div className={styles.MobileMenu}>
      <p>Home</p>
      <p>Series</p>
      <p>Films</p>
      <p>News & Popular</p>
      <p>My List</p>
      <p>Browse by Language</p>
    </div>
  );
};

const Dashboard = () => {
  const { data: user } = useCurrentUser();

  return (
    <div className={styles.Dashboard}>
      <div>
        <img src="/avatar.png" />
        <p>{user?.name}</p>
      </div>
      <hr />
      <div className={styles.signOut} onClick={() => signOut()}>
        <p>Sign out</p>
      </div>
    </div>
  );
};

const index: React.FC = () => {
  const [isBrowserOpen, setIsBrowserOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > TOP_OFFSET) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={styles.NavContainer}
      style={{ background: showBackground ? "#000" : "transparent" }}
    >
      <div className={styles.parentNavContainer}>
        <div className={styles.NavContentHolder}>
          <img src="/images/logo.png" />
          <div className={styles.NavItemHolder}>
            <NavbarItem label={"Home"} />
            <NavbarItem label={"Series"} />
            <NavbarItem label={"Films"} />
            <NavbarItem label={"News & Popular"} />
            <NavbarItem label={"My List"} />
            <NavbarItem label={"Browser by languages"} />
          </div>
          <div
            className={styles.MobileNavItemPlaceHolder}
            onClick={() => setIsBrowserOpen(!isBrowserOpen)}
          >
            <p>Browse</p>
            <BsChevronCompactDown
              style={{
                transform: `rotate(${isBrowserOpen ? "180deg" : "0deg"})`,
                transition: "rotate 0.08s ease-in-out",
              }}
              className={styles.BsChevron}
            />
          </div>
        </div>
        <div className={styles.NavDashboard}>
          <p>
            <IoSearch />
          </p>
          <p>
            <GoBell />
          </p>
          <div>
            <img src="/avatar.png" />
          </div>
          <BsChevronCompactDown
            className={styles.BsChevron}
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
            style={{
              transform: `rotate(${isDashboardOpen ? "180deg" : "0deg"})`,
              transition: "rotate 0.08s ease-in-out",
            }}
          />
          {isDashboardOpen && <Dashboard />}
        </div>
      </div>
      {isBrowserOpen && <MobileMenu />}
    </div>
  );
};

export default index;
