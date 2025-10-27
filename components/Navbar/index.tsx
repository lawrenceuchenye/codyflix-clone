import styles from "./index.module.css";
import { BsChevronCompactDown } from "react-icons/bs";
import React from "react";

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

const index: React.FC = () => {
  return (
    <div className={styles.NavContainer}>
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
        <div className={styles.MobileNavItemPlaceHolder}>
          <p>Browse</p>
          <BsChevronCompactDown className={styles.BsChevron} />
        </div>
      </div>
    </div>
  );
};

export default index;
