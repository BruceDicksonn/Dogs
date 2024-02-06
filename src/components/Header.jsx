import React from "react";
import styles from "./Header.module.css";
import { Link, Route } from "react-router-dom";
import Dogs from "../assets/dogs.svg?react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link className={styles.logo} to="/" aria-label="Dogs">
          <Dogs />
        </Link>
        { data ? (
          <Link to="/conta" className={styles.login}>
             { data.nome }
          </Link>          
        ) : (
          <Link to="/login" className={styles.login}>
             Login / Criar
          </Link>
        )} 
      </nav>
    </header>
  );
};

export default Header;
